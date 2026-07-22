// Xflix — FSD Lite ESLint 규칙
//
// 레이어: app → pages → widgets → features → entities → shared
//
// 예외 (이 설정이 막지 않음)
// - app 조합 루트
// - lazy(() => import('…')) 동적 import
// - 허용 세그먼트에 대한 @/shared/<segment>/… deep import (점진 정리)
// - app / pages 세그먼트 이름 (providers, routes 등) — 대상 아님
// - 상대 경로로 다른 슬라이스를 가는 경우 (alias @/ 기준만 검사)

// 슬라이스(entities/features/widgets) 허용 세그먼트
const ALLOW_SEGMENTS = 'ui|model|api|lib|config|types'

// shared 허용 세그먼트 (assets 포함)
const SHARED_SEGMENTS = `${ALLOW_SEGMENTS}|assets`

// 1. 슬라이스·레이어 내부 경로(deep import) 금지 → public API만
const sliceDeepImportPatterns = [
  {
    group: [
      '@/entities/*/**',
      '@/features/*/**',
      '@/widgets/*/**',
      '@/pages/*/**',
      '@/app/*/**',
    ],
    message:
      '내부 경로 직접 import 금지. public API(@/entities/<slice>, @/pages/<Page> 등)를 사용하세요.',
  },
]

// 2. 허용 세그먼트만 사용
const allowedSegmentPatterns = [
  {
    regex: `^@/(entities|features|widgets)/[^/]+/(?!(?:${ALLOW_SEGMENTS})(?:/|$))`,
    message: `허용 세그먼트만 사용하세요: ${ALLOW_SEGMENTS.replace(/\|/g, ', ')}`,
  },
  {
    regex: `^@/shared/(?!(?:${SHARED_SEGMENTS})(?:/|$))`,
    message: `shared 허용 세그먼트만 사용하세요: ${SHARED_SEGMENTS.replace(/\|/g, ', ')}`,
  },
]

// 3. entities / features / widgets / pages 레이어 index 금지
const layerIndexPaths = [
  {
    name: '@/entities',
    message:
      '레이어 index(@/entities) 금지. 슬라이스 경로(@/entities/<slice>)를 사용하세요.',
  },
  {
    name: '@/features',
    message:
      '레이어 index(@/features) 금지. 슬라이스 경로(@/features/<slice>)를 사용하세요.',
  },
  {
    name: '@/widgets',
    message:
      '레이어 index(@/widgets) 금지. 슬라이스 경로(@/widgets/<slice>)를 사용하세요.',
  },
  {
    name: '@/pages',
    message:
      '레이어 index(@/pages) 금지. 페이지 경로(@/pages/<Page>)를 사용하세요.',
  },
]

// flat config에서 규칙이 덮어쓰이므로, 레이어 블록마다 공통 제한을 다시 넣습니다.
function restrictedImports(extraPatterns = []) {
  return [
    'error',
    {
      patterns: [
        ...sliceDeepImportPatterns,
        ...allowedSegmentPatterns,
        ...extraPatterns,
      ],
      paths: layerIndexPaths,
    },
  ]
}

// 4. 상위 레이어 import 금지 */
const ban = (layers, message) => ({
  group: layers.flatMap(layer => [layer, `${layer}/**`]),
  message,
})

// 5. 같은 레이어 슬라이스 간(@/<layer>/…) 참조 금지
//    슬라이스 내부는 상대 경로만 사용합니다.
const banSameLayer = layer => ({
  group: [`@/${layer}`, `@/${layer}/**`],
  message: `같은 레이어(${layer})에서는 @/${layer}/… import를 사용할 수 없습니다. 슬라이스 내부는 상대 경로, 조합은 상위 레이어에서 하세요.`,
})

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports(),
    },
  },

  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports([
        ban(
          ['@/features', '@/widgets', '@/pages', '@/app'],
          'shared는 상위 레이어(features/widgets/pages/app)를 import할 수 없습니다.',
        ),
      ]),
    },
  },

  {
    files: ['src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports([
        ban(
          ['@/features', '@/widgets', '@/pages', '@/app'],
          'entities는 상위 레이어(features/widgets/pages/app)를 import할 수 없습니다.',
        ),
        banSameLayer('entities'),
      ]),
    },
  },

  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports([
        ban(
          ['@/widgets', '@/pages', '@/app'],
          'features는 상위 레이어(widgets/pages/app)를 import할 수 없습니다.',
        ),
        banSameLayer('features'),
      ]),
    },
  },

  {
    files: ['src/widgets/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports([
        ban(
          ['@/pages', '@/app'],
          'widgets는 상위 레이어(pages/app)를 import할 수 없습니다.',
        ),
        banSameLayer('widgets'),
      ]),
    },
  },

  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictedImports([
        ban(['@/app'], 'pages는 상위 레이어(app)를 import할 수 없습니다.'),
        banSameLayer('pages'),
      ]),
    },
  },
]
