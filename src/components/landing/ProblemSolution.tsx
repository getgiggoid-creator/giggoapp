import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Free Products",
    desc: "Companies Selling Physical Products Send Free Samples To Creators On GIGGO. You Create Content For These Brands While Getting Paid Hourly. And Many Creators Receive Dozens Of Free Products They Genuinely Love.",
  },
  {
    q: "Extra Earnings",
    desc: "The More You Work, The More You Can Earn. Many Brands Offer Bonus Opportunities And Performance-Based Additional Pay.",
  },
  {
    q: "For Both Experienced And Inexperienced Creators",
    desc: "GIGGO Offers A Wide Range Of Jobs, Most With Little To No Experience Required. Prior Experience Can Help You Stand Out, But It's Never Required To Get Started.",
  },
];

const ProblemSolution = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-[120px] bg-white" id="faq">
      <div className="mx-auto px-6 max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-[hsl(155,60%,38%)] mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-semibold text-[hsl(0,0%,10%)] leading-[1.2] mb-3"
          >
            Creator <span className="text-[hsl(155,60%,38%)]">Perks?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-[hsl(0,0%,50%)] max-w-[480px] mx-auto"
          >
            Not Only Do You Get Paid By The Hour, But Brands Will Send You Tons Of Free Products Just For Working With Them.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mt-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h3 className="text-base font-semibold text-[hsl(0,0%,10%)]">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-[hsl(155,60%,38%)] transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-sm text-[hsl(0,0%,50%)] leading-relaxed">
                  {faq.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
