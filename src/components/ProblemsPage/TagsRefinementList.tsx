import * as React from 'react';
import { useRefinementList } from 'react-instantsearch';
import { useState, useMemo } from 'react';

// Map tags to topic categories
const TAG_CATEGORIES: Record<string, string[]> = {
  'Number Theory': [
    'Number Theory',
    'Divisibility',
    'Modular Arithmetic',
    'Prime Numbers',
    'GCD',
    'LCM',
    'Factorization',
    'Congruence',
    'Fibonacci',
  ],
  'Algebra': [
    'Algebra',
    'Linear Equations',
    'Systems',
    'Quadratic Equations',
    'Polynomials',
    'Inequalities',
    'Exponents',
    'Functions',
    'Optimization',
    'Sequences',
    'Series',
    'Induction',
  ],
  'Geometry': [
    'Geometry',
    'Area',
    'Angles',
    'Coordinates',
    'Circles',
    '3D Geometry',
    'Congruence',
    'Similarity',
    'Transformation',
    'Symmetry',
    'Vectors',
    'Graphing',
  ],
  'Trigonometry': [
    'Trigonometry',
    'Sine',
    'Cosine',
    'Tangent',
    'Law of Sines',
    'Law of Cosines',
    'Trigonometric Identities',
  ],
  'Combinatorics': [
    'Counting',
    'Combinations',
    'Permutations',
    'Logic',
    'Recursion',
    'Pigeonhole',
    'Graph Theory',
    'Trees',
    'Matching',
    'Bipartite',
    'Game Theory',
  ],
  'Arithmetic': [
    'Arithmetic',
    'Proportions',
    'Fractions',
    'Percent',
    'Decimals',
    'Ratios',
    'Rounding',
  ],
  'Complex': [
    'Complex Numbers',
    'Complex',
    'Imaginary',
    'De Moivre',
  ],
};

// Get category for a tag
const getTagCategory = (tag: string): string => {
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
      return category;
    }
  }
  return 'Other';
};

export default function TagsRefinementList() {
  const { items, refine, createURL } = useRefinementList({
    attribute: 'tags',
    limit: 500,
  });

  // Group items by category
  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const category = getTagCategory(item.label);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, [items]);

  // Sort categories: predefined first, then "Other"
  const categoryOrder = [
    'Number Theory',
    'Algebra',
    'Geometry',
    'Trigonometry',
    'Combinatorics',
    'Arithmetic',
    'Complex',
    'Other',
  ];
  const sortedCategories = categoryOrder.filter(cat => groupedItems[cat]);

  // Default to only Number Theory, Algebra, and Geometry expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Number Theory', 'Algebra', 'Geometry'])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="ml-1 text-left space-y-3">
      {sortedCategories.map(category => (
        <div key={category}>
          <button
            onClick={() => toggleCategory(category)}
            className="flex items-center gap-2 w-full text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${
                expandedCategories.has(category) ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {category}
          </button>

          {expandedCategories.has(category) && (
            <div className="ml-4 mt-2 space-y-2">
              {groupedItems[category].map(item => (
                <div key={item.label}>
                  <a
                    href={createURL(item.value)}
                    className={`block text-sm ${
                      item.isRefined
                        ? 'font-medium text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    } transition-colors`}
                    onClick={e => {
                      e.preventDefault();
                      refine(item.value);
                    }}
                  >
                    {item.label} ({item.count})
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
