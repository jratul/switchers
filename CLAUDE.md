# Switchers

닌텐도 스위치 쇼핑몰 이커머스 웹 애플리케이션.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (커스텀 폰트: Pretendard, Aldrich)
- **Database**: MongoDB
- **Auth**: NextAuth.js v4 (Credentials Provider + MongoDB Adapter)
- **State**: Zustand (장바구니 카운트)
- **UI**: Headless UI, Heroicons
- **Deploy**: Vercel

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   │   ├── auth/[...nextauth]/   # NextAuth 핸들러
│   │   ├── games/                # 게임 상품 API (GET 전체, POST 필터, GET [slug])
│   │   ├── devices/              # 본체 API
│   │   ├── accs/                 # 액세서리 API
│   │   ├── cart/                 # 장바구니 (POST 조회, POST add, DELETE)
│   │   ├── reviews/game/[slug]/  # 리뷰 조회
│   │   ├── popular/              # 인기 게임 (리뷰 평점 순 Top 5)
│   │   ├── recent/               # 최근 출시 게임 Top 5
│   │   ├── join/                 # 회원가입
│   │   └── login/                # 로그인 검증
│   ├── games/                    # 게임 목록 + 상세 + 리뷰
│   ├── devices/                  # 본체 목록 + 상세
│   ├── accs/                     # 액세서리 목록 + 상세
│   ├── events/                   # 이벤트 패키지 페이지
│   ├── cart/                     # 장바구니 (인증 필요)
│   ├── login/                    # 로그인 / 회원가입
│   ├── Nav.tsx                   # 헤더 네비게이션
│   ├── Carousel.tsx              # 메인 캐러셀
│   ├── Footer.tsx                # 푸터
│   ├── WrapperPage.tsx           # SessionProvider 래퍼
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 (인기 순위 + 최근 출시)
│   ├── error.tsx                 # 500 에러 페이지
│   ├── not-found.tsx             # 404 페이지
│   └── loading.tsx               # 로딩 스피너
├── components/                   # 재사용 컴포넌트
│   ├── GameProductListItem.tsx   # 게임 카드 (평점 포함)
│   ├── MainProductListItem.tsx   # 홈 게임 카드 (오버레이)
│   ├── OtherProductListItem.tsx  # 본체/액세서리 카드
│   ├── CartItem.tsx              # 장바구니 아이템
│   ├── ReviewItem.tsx            # 리뷰 아이템
│   ├── Rating.tsx                # 별점 컴포넌트 (SVG)
│   ├── BaseDialog.tsx            # 모달 다이얼로그 (Headless UI)
│   ├── NavMainItem.tsx           # 네비게이션 드롭다운
│   ├── Spinner.tsx               # 로딩 스피너 (SVG)
│   └── Divider.tsx               # 구분선
├── constants/
│   ├── types.ts                  # TypeScript 타입 정의
│   └── data.ts                   # 필터 데이터, 상수
├── hooks/
│   └── useCartCountStore.ts      # Zustand 장바구니 카운트 스토어
└── util/
    ├── authOptions.ts            # NextAuth 설정
    ├── database.ts               # MongoDB 클라이언트
    └── getReviewStat.ts          # 리뷰 통계 계산
```

## 주요 기능

- **상품 탐색**: 게임(시리즈 필터), 본체, 액세서리
- **장바구니**: 상품 추가/삭제, 총 가격 계산, 결제 수단 선택 UI
- **인증**: 이메일/비밀번호 회원가입·로그인 (bcrypt 해싱)
- **리뷰**: 별점 + 리뷰 텍스트, 평점 분포 통계
- **이벤트**: 젤다·포켓몬·동물의 숲 패키지 구성

## 환경 변수

```
MONGODB_URI=           # MongoDB 연결 URI
NEXTAUTH_SECRET=       # NextAuth 시크릿
NEXTAUTH_URL=          # 배포 URL
BCRYPT_SALT=           # bcrypt salt rounds
NEXT_PUBLIC_BUCKET_URL= # 상품 이미지 버킷 URL (S3 등)
```

## MongoDB 컬렉션

| 컬렉션 | 설명 |
|--------|------|
| `games` | 게임 상품 |
| `devices` | 본체 상품 |
| `accs` | 액세서리 상품 |
| `reviews` | 리뷰 (gameId 참조) |
| `cart` | 장바구니 (userEmail 참조) |
| `users_cred` | 사용자 자격증명 (이메일, 해시 비밀번호) |

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 아키텍처 특이사항

- 게임 목록 페이지: `POST /api/games`에 필터 조건 배열을 보내 MongoDB `$or` 쿼리로 필터링
- 인기 순위: MongoDB aggregation으로 리뷰 평균 점수를 계산해 정렬
- 게임 필터링 (`games/page.tsx`): URL query param(`?filter=mario`)으로 초기 체크박스 상태를 설정
- 장바구니 카운트: Zustand 전역 상태로 Nav 배지와 동기화
- 이벤트 페이지: 각 이벤트 구성 상품을 클라이언트에서 별도 fetch
