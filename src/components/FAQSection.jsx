import { PlusIcon } from './Icons.jsx';

/**
 * FAQ accordion built on native <details>/<summary>.
 * Zero JavaScript, works without hydration, keyboard accessible by default and
 * pairs with FAQPage structured data on the same page.
 */
export default function FAQSection({
  items = [],
  title = 'Frequently asked questions',
  id,
  defaultOpenIndex = 0,
}) {
  if (!items.length) return null;

  return (
    <section aria-labelledby={id ? `${id}-heading` : undefined}>
      {title && (
        <h2 id={id ? `${id}-heading` : undefined} style={{ marginBottom: '16px' }}>
          {title}
        </h2>
      )}
      <div className="faq-list" id={id}>
        {items.map((item, index) => (
          <details className="faq-item" key={item.question} open={index === defaultOpenIndex}>
            <summary>
              <span>{item.question}</span>
              <PlusIcon className="faq-item__icon" aria-hidden="true" />
            </summary>
            <div className="faq-item__body">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
