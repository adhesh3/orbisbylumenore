import * as Dialog from '@radix-ui/react-dialog';
import { Sparkles, X, Send, Trash2 } from 'lucide-react';
import { useApp } from '@/app/AppContext';
import { useState } from 'react';
import { formatUSD } from '@/lib/utils';
import { totalNetWorth, allocation, liquidAssets, illiquidAssets } from '@/data/networth';
import { cds, mutualFunds, publicStocks, retirementAccounts } from '@/data/investments';
import { loans, monthlyEmiTotal } from '@/data/loans';
import { annualPremiumTotal, totalCoverage } from '@/data/insurance';
import { monthlyIncomeTotal } from '@/data/income';
import { monthlyExpenseTotal } from '@/data/expenses';
import { cn } from '@/lib/utils';

type Msg = { id: string; role: 'user' | 'assistant'; text: string; chips?: string[] };

const SUGGESTED = [
  'What is my current net worth?',
  'Which CDs are maturing in the next 3 months?',
  'Show me my top 3 expenses this month',
  'What is my total EMI burden?',
  'How diversified is my investment portfolio?',
];

function answerFor(question: string): { text: string; chips?: string[] } {
  const q = question.toLowerCase();

  if (q.includes('net worth')) {
    return {
      text: `Your current total net worth is ${formatUSD(totalNetWorth, { compact: true })} (${formatUSD(totalNetWorth)}). That's total assets of ${formatUSD(totalNetWorth + loans.reduce((s, l) => s + l.outstanding, 0), { compact: true })} minus total liabilities of ${formatUSD(loans.reduce((s, l) => s + l.outstanding, 0), { compact: true })}.`,
      chips: ['Show 12-month trend', 'Asset breakdown', 'Compare to last year'],
    };
  }
  if (q.includes('cd') && (q.includes('matur') || q.includes('next'))) {
    const next3 = cds.filter((c) => {
      const days = (new Date(c.maturityDate).getTime() - Date.now()) / 86400000;
      return days <= 95 && days >= 0;
    });
    if (next3.length === 0) {
      return { text: 'No CDs are maturing in the next 3 months. Your nearest maturity is Capital One CD on Aug 1, 2026 ($259,625).' };
    }
    return {
      text: `${next3.length} CD(s) maturing in the next ~3 months: ` +
        next3.map((c) => `${c.bank} — ${formatUSD(c.currentValue)} on ${c.maturityDate}`).join('; '),
    };
  }
  if (q.includes('top') && q.includes('expense')) {
    return {
      text: `Your top 3 monthly expense categories are: Property Taxes & HOA (~$45K), Travel & Entertainment (~$43K), and Loan EMIs (~$45K). Your total monthly outflow is ${formatUSD(monthlyExpenseTotal)}.`,
      chips: ['Show expense breakdown', 'Compare to last month'],
    };
  }
  if (q.includes('emi') || (q.includes('loan') && q.includes('total'))) {
    return {
      text: `Your total monthly EMI burden is ${formatUSD(monthlyEmiTotal)} across ${loans.filter((l) => l.type !== 'Credit Card').length} loans. Total outstanding debt: ${formatUSD(loans.reduce((s, l) => s + l.outstanding, 0), { compact: true })}.`,
      chips: ['Show loan details', 'Forecast debt-free date'],
    };
  }
  if (q.includes('divers') || q.includes('portfolio')) {
    const total = totalNetWorth + loans.reduce((s, l) => s + l.outstanding, 0);
    const re = (allocation.realEstate / total) * 100;
    return {
      text: `Your portfolio is moderately diversified. Real estate accounts for ${re.toFixed(1)}% of assets, equities ${((allocation.equities / total) * 100).toFixed(1)}%, fixed income ${((allocation.fixedIncome / total) * 100).toFixed(1)}%. Liquid vs illiquid is roughly ${((liquidAssets / (liquidAssets + illiquidAssets)) * 100).toFixed(0)}% / ${((illiquidAssets / (liquidAssets + illiquidAssets)) * 100).toFixed(0)}%.`,
      chips: ['Suggest a rebalance', 'Show allocation chart'],
    };
  }
  if (q.includes('insurance') || q.includes('coverage')) {
    return {
      text: `Total insurance coverage across the family is ${formatUSD(totalCoverage, { compact: true })} with an annual premium outgo of ${formatUSD(annualPremiumTotal)}.`,
    };
  }
  if (q.includes('income') || q.includes('earn')) {
    return {
      text: `The family's combined monthly income (averaged) is ${formatUSD(monthlyIncomeTotal)}, or about ${formatUSD(monthlyIncomeTotal * 12, { compact: true })} annually.`,
    };
  }
  if (q.includes('retirement') || q.includes('401') || q.includes('ira')) {
    return {
      text: `Your retirement accounts total ${formatUSD(retirementAccounts.reduce((s, r) => s + r.currentCorpus, 0), { compact: true })} across ${retirementAccounts.length} accounts (401(k), Traditional & Roth IRAs, SEP IRA, HSA).`,
    };
  }
  if (q.includes('stock') || q.includes('equit')) {
    const top = [...publicStocks].sort((a, b) => b.qty * b.currentPrice - a.qty * a.currentPrice)[0];
    return {
      text: `Your largest single stock holding is ${top.name} (${top.ticker}) worth ${formatUSD(top.qty * top.currentPrice)}. Total public equities: ${formatUSD(publicStocks.reduce((s, x) => s + x.qty * x.currentPrice, 0), { compact: true })}.`,
    };
  }
  if (q.includes('mutual') || q.includes('fund') || q.includes('mf')) {
    return {
      text: `You have ${mutualFunds.length} mutual fund positions totaling ${formatUSD(mutualFunds.reduce((s, x) => s + x.currentValue, 0), { compact: true })}. Blended XIRR is approximately ${(mutualFunds.reduce((s, x) => s + x.xirr * x.currentValue, 0) / mutualFunds.reduce((s, x) => s + x.currentValue, 0)).toFixed(1)}%.`,
    };
  }

  return {
    text: `I have full read access to your portfolio. I can help with net worth, investments, cash flow, taxes, insurance, and financial concepts. Try one of the suggestions below.`,
    chips: SUGGESTED,
  };
}

export function AskMePanel() {
  const { askMeOpen, setAskMeOpen } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'init',
      role: 'assistant',
      text: `Hi — I'm AskMe, your private wealth AI. I have read access to everything in your Orbis platform. Ask me anything about your portfolio, cash flow, or what's coming up.`,
      chips: SUGGESTED,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const a = answerFor(text);
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: a.text, chips: a.chips }]);
      setTyping(false);
    }, 700);
  };

  const clear = () =>
    setMessages([
      {
        id: 'init2',
        role: 'assistant',
        text: `Chat cleared. What would you like to ask?`,
        chips: SUGGESTED,
      },
    ]);

  return (
    <Dialog.Root open={askMeOpen} onOpenChange={setAskMeOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-screen w-full sm:w-[460px] bg-white shadow-pop border-l border-border flex flex-col data-[state=open]:animate-fade-in">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-navy to-navy-700 text-white">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center text-navy-800">
                <Sparkles size={16} />
              </div>
              <div>
                <Dialog.Title className="text-sm font-semibold">AskMe — Your Wealth AI</Dialog.Title>
                <Dialog.Description className="text-[11px] text-navy-200">
                  Powered by Orbis · Private and contextual
                </Dialog.Description>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clear}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-white/10"
                aria-label="Clear chat"
              >
                <Trash2 size={14} />
              </button>
              <Dialog.Close asChild>
                <button
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-canvas">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex gap-2.5', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {m.role === 'assistant' && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center text-navy-800 text-[10px] font-bold shrink-0">
                    AI
                  </div>
                )}
                <div className={cn('max-w-[78%] space-y-2')}>
                  <div
                    className={cn(
                      'rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-navy text-white rounded-tr-sm'
                        : 'bg-white border border-border text-navy rounded-tl-sm',
                    )}
                  >
                    {m.text}
                  </div>
                  {m.chips?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          onClick={() => send(c)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-border text-navy hover:border-navy-200 hover:bg-navy-50 transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2.5 items-center">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center text-navy-800 text-[10px] font-bold">
                  AI
                </div>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-navy-200 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-navy-200 animate-pulse [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-navy-200 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 bg-white"
          >
            <div className="flex items-center gap-2 rounded-md border border-border bg-white pr-2 focus-within:border-navy-200 focus-within:ring-2 focus-within:ring-navy-100">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your wealth, taxes, returns…"
                className="flex-1 h-10 px-3 text-sm bg-transparent outline-none"
              />
              <button
                type="submit"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-navy text-white hover:bg-navy-700"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 px-1">
              AskMe provides information based on your entered data. Not financial advice.
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
