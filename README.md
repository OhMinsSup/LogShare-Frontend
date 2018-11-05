폴더 구조

## 1. landing, register, login 컴포넌트 화면 디자인및 구상 
  * register-form-contaienr o
  * login-form-container o
  * form은 registerForm, LoginForm으로 따로 나눠서 만든다. 이떄 AuthForm은 이름을 바꾼다. o
  * authTemplate이라는 템플릿을 만들어서 register, login 탬플릿의 중복을 방지한다 o
  * form에서 겹치는 내용들은 컴포넌트로 분리한다. o
  * 소셜로 회원가입을 할 때 register 페이지에 값을 넘겨준다. pinter에서 사용하던 방식으로 한다. x
  * 이떄 비밀번호는 작성을 못하게 한다. x
  * landing-container는 포스트를 보여주는 페이지로 만든다. x
  
  > 랜딩페이지가 만들어지면 그때부터 redux 부분 코딩을 시작한다.

## 2. landig 페이지 ui 디자인
  * 유저 헤더와 함께 글쓰기등의 옵션을 같이 나열
  * 유저 메뉴
  * 서브 사이드바 쪽 작성
  * 코드 리펙토링 체크

> 랜딩페이지가 만들어지면 그때부터 redux 부분 코딩을 시작한다.
