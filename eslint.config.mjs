import importPlugin from 'eslint-plugin-import'
import nextTs from 'eslint-config-next/typescript'
import boundariesPlugin from 'eslint-plugin-boundaries'
import nextVitals from 'eslint-config-next/core-web-vitals'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  //  Next.js defaults
  ...nextVitals,
  ...nextTs,
  //  Global ignores
  globalIgnores(['_drizzle/**', '.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**', 'next-env.d.ts', 'eslint.config.mjs', '*.config.{js,ts,mjs}']),
  //  Import resolver & Boundaries settings
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
          alwaysTryTypes: true
        }
      },
      'boundaries/elements': [
        {
          type: 'atom',
          pattern: 'src/components/atoms/**/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'atom',
          pattern: 'src/components/atoms/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'molecule',
          pattern: 'src/components/molecules/**/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'molecule',
          pattern: 'src/components/molecules/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'organism',
          pattern: 'src/components/organisms/**/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'organism',
          pattern: 'src/components/organisms/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'template',
          pattern: 'src/components/templates/**/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'template',
          pattern: 'src/components/templates/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'feature',
          pattern: 'src/features/**/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'feature',
          pattern: 'src/features/*',
          mode: 'folder',
          capture: ['elementName']
        },
        {
          type: 'page',
          pattern: 'src/app/**/page.{ts,tsx}',
          capture: ['_', 'pageName']
        },
        {
          type: 'app-special',
          pattern: 'src/app/**/{layout,providers,error,loading,not-found,global-error,template,default}.{ts,tsx}'
        },
        {
          type: 'shared',
          pattern: 'src/{helpers,lib,utils,types,constants,hooks,context,styles}/**'
        }
      ],
      'boundaries/ignore': ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/*.stories.{ts,tsx}', '**/__tests__/**', '**/__mocks__/**']
    }
  },
  //  SPECIAL FILES & API ROUTES - No restrictions
  {
    files: [
      'src/app/**/layout.{ts,tsx}',
      'src/app/**/providers.{ts,tsx}',
      'src/app/**/error.{ts,tsx}',
      'src/app/**/loading.{ts,tsx}',
      'src/app/**/not-found.{ts,tsx}',
      'src/app/**/global-error.{ts,tsx}',
      'src/app/**/template.{ts,tsx}',
      'src/app/**/default.{ts,tsx}',
      'src/app/**/route.{ts,tsx}', // API routes
      'src/app/**/actions.{ts,tsx}', // Server actions
      'src/middleware.{ts,tsx}',
      'src/**/preline-*.{ts,tsx}',
      'src/**/*.config.{ts,tsx}',
      'src/{helpers,lib,utils,types,constants,hooks,context,styles,database}/**/*.{ts,tsx}'
    ],
    rules: {
      'import/no-internal-modules': 'off',
      'boundaries/element-types': 'off'
    }
  },
  //  ATOMIC DESIGN ARCHITECTURE RULES (ONLY FOR COMPONENTS & PAGES)
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/features/**/*.{ts,tsx}', 'src/app/**/page.{ts,tsx}'],
    ignores: [
      'src/app/**/layout.{ts,tsx}',
      'src/app/**/providers.{ts,tsx}',
      'src/app/**/error.{ts,tsx}',
      'src/app/**/loading.{ts,tsx}',
      'src/app/**/not-found.{ts,tsx}',
      'src/app/**/global-error.{ts,tsx}',
      'src/app/**/template.{ts,tsx}',
      'src/app/**/default.{ts,tsx}',
      'src/app/**/route.{ts,tsx}', // Exclude API routes
      'src/app/**/actions.{ts,tsx}', // Exclude server actions
      'src/**/preline-*.{ts,tsx}',
      'src/**/*.config.{ts,tsx}',
      'src/{helpers,lib,utils,types,constants,hooks,context,styles,database}/**/*.{ts,tsx}'
    ],
    plugins: {
      import: importPlugin,
      boundaries: boundariesPlugin
    },
    rules: {
      //  ==========================================
      //  PUBLIC API ENFORCEMENT (index.ts only)
      //  ==========================================
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            // Next.js & React internals
            'next',
            'next/*',
            'next/**',
            'react',
            'react/*',
            'react-dom',
            'react-dom/*',
            // Component public APIs (any subfolder depth via index.ts)
            '@/components/atoms/*',
            '@/components/atoms/**/*',
            '@/components/molecules/*',
            '@/components/molecules/**/*',
            '@/components/organisms/*',
            '@/components/organisms/**/*',
            '@/components/templates/*',
            '@/components/templates/**/*',
            // Features public APIs
            '@/features/*',
            '@/features/**/*',
            // Shared utilities (allowed deeper imports)
            '@/helpers/*',
            '@/helpers/**',
            '@/lib/*',
            '@/lib/**',
            '@/utils/*',
            '@/utils/**',
            '@/types/*',
            '@/types/**',
            '@/constants/*',
            '@/constants/**',
            '@/hooks/*',
            '@/hooks/**',
            '@/context/*',
            '@/context/**',
            '@/styles/*',
            '@/styles/**',
            // Database (should NOT be imported in components)
            // If you need to access DB, use API routes or server actions
            // '@/database/*',
            // '@/database/**',
            // External packages
            '**/node_modules/**'
          ]
        }
      ],
      //  ==========================================
      //  ATOMIC DESIGN BOUNDARIES
      //  ==========================================
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${file.type} is not allowed to import ${dependency.type}',
          rules: [
            //  ========================================
            //  ATOMS - Can import other atoms & shared
            //  ========================================
            {
              from: ['atom'],
              allow: ['atom', 'shared'],
              message: 'Atoms can import other atoms and shared utilities'
            },
            {
              from: ['atom'],
              disallow: ['molecule', 'organism', 'template', 'feature', 'page'],
              message: 'Atoms cannot import: ${dependency.type} "${dependency.name}".\n   Atoms can only import other atoms and shared utilities.'
            },
            //  ========================================
            //  MOLECULES - Same level & below (atoms) + shared
            //  ========================================
            {
              from: ['molecule'],
              allow: ['molecule', 'atom', 'shared'],
              message: 'Molecules can import other molecules, atoms, and shared utilities'
            },
            {
              from: ['molecule'],
              disallow: ['organism', 'template', 'feature', 'page'],
              message: 'Molecules cannot import: ${dependency.type} "${dependency.name}".\n   Molecules can only import from molecules and below.'
            },
            //  ========================================
            //  ORGANISMS - Same level & below (molecules, atoms) + shared
            //  ========================================
            {
              from: ['organism'],
              allow: ['organism', 'molecule', 'atom', 'shared'],
              message: 'Organisms can import other organisms, molecules, atoms, and shared utilities'
            },
            {
              from: ['organism'],
              disallow: ['template', 'feature', 'page'],
              message: 'Organisms cannot import: ${dependency.type} "${dependency.name}".\n   Organisms can only import from organisms and below.'
            },
            //  ========================================
            //  TEMPLATES - Same level & below (organisms, molecules, atoms) + shared
            //  ========================================
            {
              from: ['template'],
              allow: ['template', 'organism', 'molecule', 'atom', 'shared'],
              message: 'Templates can import other templates, organisms, molecules, atoms, and shared utilities'
            },
            {
              from: ['template'],
              disallow: ['feature', 'page'],
              message: 'Templates cannot import: ${dependency.type} "${dependency.name}".\n   Templates can only import from templates and below.'
            },
            //  ========================================
            //  FEATURES - Same level & below (templates, organisms, molecules, atoms) + shared
            //  ========================================
            {
              from: ['feature'],
              allow: ['feature', 'template', 'organism', 'molecule', 'atom', 'shared'],
              message: 'Features can import other features, templates, organisms, molecules, atoms, and shared utilities'
            },
            {
              from: ['feature'],
              disallow: ['page'],
              message: 'Features cannot import: ${dependency.type} "${dependency.name}".\n   Features cannot import pages.'
            },
            //  ========================================
            //  PAGES - Only features
            //  ========================================
            {
              from: ['page'],
              allow: ['feature', 'shared'],
              message: 'Pages can import features and shared utilities'
            },
            {
              from: ['page'],
              disallow: ['atom', 'molecule', 'organism', 'template', 'page'],
              message: 'Pages cannot import: ${dependency.type} "${dependency.name}".\n   Pages should only import from features. Keep pages thin!'
            },
            //  ========================================
            //  APP SPECIAL - Can import anything
            //  ========================================
            {
              from: ['app-special'],
              allow: ['atom', 'molecule', 'organism', 'template', 'feature', 'shared'],
              message: 'Special app files (template.tsx, providers.tsx, etc.) can import from any layer'
            },
            //  ========================================
            //  SHARED - Can be imported by anyone
            //  ========================================
            {
              from: ['shared'],
              allow: ['shared'],
              message: 'Shared utilities can import other shared utilities'
            },
            {
              from: ['shared'],
              disallow: ['atom', 'molecule', 'organism', 'template', 'feature', 'page'],
              message: 'Shared utilities cannot import: ${dependency.type}.\n   Shared code must remain independent of components.'
            }
          ]
        }
      ],
      //  ==========================================
      //  ENTRY POINT ENFORCEMENT
      //  ==========================================
      'boundaries/entry-point': [
        'error',
        {
          default: 'allow',
          rules: [
            // Components must be imported via index.ts (not direct files)
            {
              target: ['atom', 'molecule', 'organism', 'template', 'feature'],
              disallow: '!(index).{ts,tsx,js,jsx}',
              message: 'Components must be imported through their public API (index.ts).\n   Direct file imports are not allowed. Use the folder import instead.'
            }
          ]
        }
      ]
    }
  },
  //  ==========================================
  //  TAILWIND ENFORCEMENT
  //  ==========================================
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/**/*.styles.{ts,tsx}', 'src/**/*.config.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='className'] Literal[value=/\\b(bg-|text-|border-|rounded|shadow|flex|grid|p-|m-|w-|h-|gap-|space-|hover:|focus:|active:|dark:|group-)/]",
          message: 'Do not use raw Tailwind classes in JSX.\n   Use apply() in .styles.ts files or CVA for variants.\n   Example: className={buttonStyles({ variant: "primary" })}'
        }
      ]
    }
  },
  //  ALLOW TAILWIND IN STYLE FILES
  {
    files: ['src/**/*.styles.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off'
    }
  },
  //  ==========================================
  //  TYPESCRIPT HYGIENE
  //  ==========================================
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  //  ==========================================
  //  IMPORT ORGANIZATION
  //  ==========================================
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // External packages
            'parent', // Parent imports
            'internal', // Internal aliases (@/)
            'sibling', // Sibling imports
            'type', // Type imports
            'index' // Index imports
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'ignore',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
      'import/no-useless-path-segments': 'error'
    }
  }
])
