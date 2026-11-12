# Semantic-GSL Project Page

IEEE RA-L 2026 논문 "Semantic-GSL: Vision-Language Semantics for Information-Theoretic Gas Source Localization" 소개 페이지.
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) 기반.

## 배포 (GitHub Pages)
1. GitHub에 새 public 저장소 생성 (예: `Semantic-GSL`)
2. 이 폴더의 파일을 모두 저장소 루트에 push
3. Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` → Save
4. 1~2분 뒤 `https://<GitHub ID>.github.io/Semantic-GSL/` 에서 확인

## 배포 전 바꿀 것
- `index.html`의 `SITE_URL` 3곳 → 실제 주소 (예: `https://<GitHub ID>.github.io/Semantic-GSL`). 링크 공유 시 미리보기 이미지에 쓰임
- Paper 버튼: IEEE Xplore 링크가 나오면 `href` 넣고 `is-pending` 클래스와 `aria-disabled` 삭제
- Code 버튼: 코드 공개 시 주석 해제
- BibTeX: 권호·페이지·DOI 확정 후 추가

## 구조
- `index.html` 페이지 본문
- `static/css/semantic-gsl.css` 템플릿(`index.css`) 위에 덧씌운 스타일
- `static/js/index.js` BibTeX 복사, 시뮬레이션 결과 표(Env/바람 전환) 데이터
- `static/images/` 논문 Figure 웹용 압축본, 소셜 미리보기, 파비콘
