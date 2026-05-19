# FSD 리팩터링 커밋 계획

README.md는 제외합니다. 하위 레이어부터 순서대로 커밋하면 빌드·import 의존성이 맞습니다.

## 커밋 순서 요약

| #   | 스코프     | 메시지                                                               |
| --- | ---------- | -------------------------------------------------------------------- |
| 1   | `entities` | `refactor(entities): 영화 도메인 타입을 entities 레이어로 분리`      |
| 2   | `shared`   | `refactor(shared): config·lib·model·ui 세그먼트로 공용 모듈 재구성`  |
| 3   | `features` | `refactor(features): movies 기능을 model·ui·config·lib 구조로 정리`  |
| 4   | `widget`   | `refactor(widget): entities·shared·features 경로에 맞게 import 갱신` |
| 5   | `pages`    | `refactor(pages): FSD 세그먼트 경로로 페이지 import 정리`            |
| 6   | `app`      | `refactor(app): 라우터 shared 세그먼트 경로 반영`                    |

---

## 1. entities

**메시지**

```
refactor(entities): 영화 도메인 타입을 entities 레이어로 분리
```

**설명**  
TMDB/API·콘텐츠·영화 타입을 `features/movies/types`에서 `entities/movie/model`로 이동해 도메인 모델을 레이어 상단에 둡니다.

**파일**

```text
src/entities/movie/model/api.types.ts      (신규)
src/entities/movie/model/content.types.ts  (신규)
src/entities/movie/model/movie.types.ts    (신규)
src/entities/movie/model/index.ts          (신규)
```

**명령 예시**

```bash
git add src/entities/
git commit -m "$(cat <<'EOF'
refactor(entities): 영화 도메인 타입을 entities 레이어로 분리

TMDB API·콘텐츠·영화 타입을 features에서 분리해 재사용 가능한 도메인 모델로 정의합니다.
EOF
)"
```

---

## 2. shared

**메시지**

```
refactor(shared): config·lib·model·ui 세그먼트로 공용 모듈 재구성
```

**설명**  
`constants` → `config`, `utils` → `lib/helper`, `hooks` → `model`, `components` → `ui`로 FSD Lite 세그먼트에 맞게 이동합니다.

**파일**

```text
# 신규
src/shared/config/api-config.ts
src/shared/config/breakpoints.ts
src/shared/config/routes.ts
src/shared/lib/helper/logger.ts
src/shared/lib/helper/path.ts
src/shared/lib/index.ts
src/shared/model/get-scroll-y.ts
src/shared/model/scroll-disable.ts
src/shared/model/index.ts
src/shared/ui/ImageLazyLoadUI.tsx
src/shared/ui/LoadingScreen.tsx
src/shared/ui/Modal.tsx
src/shared/ui/adult-ui.tsx
src/shared/ui/index.ts
src/shared/ui/layout/Footer.tsx
src/shared/ui/layout/Header.tsx
src/shared/ui/layout/RootLayout.tsx

# 삭제 (레거시)
src/shared/constants/breakpoints.ts
src/shared/constants/routes.ts
src/shared/utils/index.ts
src/shared/utils/logger.ts
src/shared/utils/path.ts
src/shared/hooks/index.ts
src/shared/hooks/useGetScroll.ts
src/shared/hooks/useScrollBlock.ts
src/shared/components/layout/Footer.tsx
src/shared/components/layout/Header.tsx
src/shared/components/layout/RootLayout.tsx
src/shared/components/ui/ImageLazyLoadUI.tsx
src/shared/components/ui/LoadingScreen.tsx
src/shared/components/ui/Modal.tsx
src/shared/components/ui/adult-ui.tsx
src/shared/components/ui/index.ts
```

**명령 예시**

```bash
git add src/shared/config/ src/shared/lib/ src/shared/model/ src/shared/ui/
git add -u src/shared/constants/ src/shared/utils/ src/shared/hooks/ src/shared/components/
git commit -m "$(cat <<'EOF'
refactor(shared): config·lib·model·ui 세그먼트로 공용 모듈 재구성

constants·utils·hooks·components를 FSD Lite 세그먼트(config, lib, model, ui)로 이동합니다.
EOF
)"
```

---

## 3. features (movies)

**메시지**

```
refactor(features): movies 기능을 model·ui·config·lib 구조로 정리
```

**설명**  
hooks → `model`, components → `ui`, constants → `config`, utils → `lib`로 이동하고 API 설정은 `shared/config`를 사용합니다. 레거시 types·hooks·components를 제거합니다.

**파일**

```text
# 신규
src/features/movies/config/home-categories.ts
src/features/movies/lib/helper.ts
src/features/movies/model/get-tmdb-contents.ts
src/features/movies/model/get-tmdb-movies.ts
src/features/movies/ui/content-row.tsx
src/features/movies/ui/contents-list.tsx

# 수정
src/features/movies/api/tmdb-auth.ts
src/features/movies/api/tmdb-client.ts
src/features/movies/api/tmdb-service.ts
src/features/movies/index.ts

# 삭제 (레거시)
src/features/movies/api/config.ts
src/features/movies/components/content-row.tsx
src/features/movies/components/contents-list.tsx
src/features/movies/constants/home-categories.ts
src/features/movies/hooks/useGetContents.ts
src/features/movies/hooks/useGetMovie.ts
src/features/movies/types/api.ts
src/features/movies/types/common.ts
src/features/movies/types/index.ts
src/features/movies/types/movie.ts
src/features/movies/utils/image.ts
```

**명령 예시**

```bash
git add src/features/movies/config/ src/features/movies/lib/ src/features/movies/model/ src/features/movies/ui/
git add src/features/movies/api/tmdb-auth.ts src/features/movies/api/tmdb-client.ts \
        src/features/movies/api/tmdb-service.ts src/features/movies/index.ts
git add -u src/features/movies/api/config.ts src/features/movies/components/ \
        src/features/movies/constants/ src/features/movies/hooks/ \
        src/features/movies/types/ src/features/movies/utils/
git commit -m "$(cat <<'EOF'
refactor(features): movies 기능을 model·ui·config·lib 구조로 정리

데이터 훅·UI·설정·헬퍼를 세그먼트별로 분리하고 entities·shared config를 참조하도록 API를 정리합니다.
EOF
)"
```

---

## 4. widget

**메시지**

```
refactor(widget): entities·shared·features 경로에 맞게 import 갱신
```

**설명**  
widget 레이어가 새 entities 타입, shared 세그먼트, features의 model·ui·lib 경로를 사용하도록 수정합니다.

**파일**

```text
src/widget/featured-movie/model/get-featured-movie.ts
src/widget/featured-movie/ui/featured-movie.tsx
src/widget/genre-movies/model/build-display-genres.ts
src/widget/genre-movies/ui/genre-movies-list.tsx
src/widget/movie-detail/model/model.ts
src/widget/movie-detail/ui/movie-backdrop.tsx
src/widget/movie-detail/ui/movie-detail-hero.tsx
src/widget/movie-detail/ui/movie-detail-overview.tsx
src/widget/movie-detail/ui/movie-detail-section.tsx
```

**명령 예시**

```bash
git add src/widget/
git commit -m "$(cat <<'EOF'
refactor(widget): entities·shared·features 경로에 맞게 import 갱신

featured-movie·genre-movies·movie-detail 위젯이 FSD 리팩터링 후 경로를 사용하도록 수정합니다.
EOF
)"
```

---

## 5. pages

**메시지**

```
refactor(pages): FSD 세그먼트 경로로 페이지 import 정리
```

**설명**  
라우트 페이지가 shared ui·config, features model·ui를 조립하도록 import를 갱신합니다.

**파일**

```text
src/pages/Home.tsx
src/pages/movie-detail.tsx
```

**명령 예시**

```bash
git add src/pages/Home.tsx src/pages/movie-detail.tsx
git commit -m "$(cat <<'EOF'
refactor(pages): FSD 세그먼트 경로로 페이지 import 정리

home·movie-detail 페이지가 shared ui/config와 features model·ui를 사용하도록 연결합니다.
EOF
)"
```

---

## 6. app

**메시지**

```
refactor(app): 라우터 shared 세그먼트 경로 반영
```

**설명**  
앱 셸 라우터의 layout·loading·routes·lib import를 shared 재구성 경로로 맞춥니다.

**파일**

```text
src/app/routes/router.tsx
```

**명령 예시**

```bash
git add src/app/routes/router.tsx
git commit -m "$(cat <<'EOF'
refactor(app): 라우터 shared 세그먼트 경로 반영

RootLayout·LoadingScreen·routes·removeRootPath import를 shared/ui·config·lib로 변경합니다.
EOF
)"
```

---

## 제외

| 파일        | 사유                                   |
| ----------- | -------------------------------------- |
| `README.md` | 문서만 변경, 코드 리팩터링 커밋과 분리 |

문서 반영은 별도 커밋 예시:

```
docs: FSD Lite 디렉터리·import 규칙 README 갱신
```

---

## 한 번에 적용 (참고)

레이어별 커밋 대신 단일 커밋이 필요할 때:

```
refactor: FSD Lite 세그먼트에 맞게 src 레이어 구조 정리

entities 추가, shared·features 세그먼트 분리, widget·pages·app import 경로 갱신.
```

README 제외 전체 스테이징:

```bash
git add src/
git reset README.md
```
