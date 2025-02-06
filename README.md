![image](https://github.com/user-attachments/assets/8bdf4370-8212-4078-8f46-60de04c4a756)


## node version

    20.10.0

- node version 설정 방법
  [nvm 설치 및 node version 변경(windows 및 mac)](https://jang8584.tistory.com/295)

## 라이브러리 설치 시

    npm install 라이브러리 이름 넣어주세요.

## git clone 후

    npm install 필수

## 로컬 실행 방법

    터미널에 npm run dev 입력

## git cli(git comamand)

<details>
<summary>git command</summary>
    
    • git clone
      github 클론 받을 레포지토리에서 <>code 버튼 클릭 후 Local tab에서 
      HTTPS 링크 복사 => 터미널에서 git clone https://github.com/NU-WA-Project/FE.git 엔터를 치면 프로젝트 폴더 클론

    • git branch 브랜치 명 (로컬 브랜치 생성)
      로컬에 브랜치를 생성할 때 명령어
      ex> git branch feat/button

    • git switch 브렌치 명(로컬 브렌치 이동)
      생성한 브랜치로 이동할 때 쓰는 명령어
      ex> git switch feat/button

    • git status (로컬 환경 상태 확인)
      로컬에서 파일 변경(생성, 수정, 삭제)관련된 상태를 확인하는 명령어

    • git add (로컬 환경에서 변경된 파일들을 스테이지에 올리는 작업)
      git add . 모든 파일이 스테이지에 올라가는 명령어
      git add src/assets~ 해당 경로에 변경된 파일만 올라감

    • git commit
      스테이징에 올라간 변경된 파일들에 어떠한 작업을 했는지 올리는 명령어
      해당 명령어를 친 후 엔터를 누르면 커밋 작성하는 곳으로 이동
      작성시 영문 i 입력 후 커밋 컨벤션에 맞는 머릿말과 작업에 대한 간단한 요약을 작성
      작성 완료 후 wq 입력하고 엔터 누르면 커밋 작성완료

    • git push origin 브랜치 명
      스테이징에 올라간 파일들을 깃헙에 해당 브랜치 명으로 브랜치로 올리는 명령어

    • git fetch origin/브랜치 명
      깃헙 레포지토리에 해당 브랜치 명을 가지고 있는 최신 변경 사항 파일을 로컬 저장소에 저장 명령어

    • git merge FETCH_HEAD
      로컬 저장소에 최신 변경 사항 파일들을 지금 있는 브랜치에 병합하는 명령어

</details>

## Commit Convention

| Tag Name            | Description                                               |
|---------------------|-----------------------------------------------------------|
| feat                | 새로운 기능을 추가                                       |
| fix                 | 버그 수정                                                |
| design              | CSS 등 사용자 UI 디자인 변경                             |                                |
| !hotfix             | 급하게 치명적인 버그를 고쳐야하는 경우                  |
| style               | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우  |
| refactor            | 프로덕션 코드 리팩토링                                    |
| comment             | 필요한 주석 추가 및 변경                                 |
| docs                | 문서 수정                                                |
| chore               | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
| rename              | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우        |
| remove              | 파일을 삭제하는 작업만 수행한 경우                        |


