[< 뒤로가기](./README.md)

## 💌 Git 전략

> 작성일 : `2022-08-06`

1. `local` submain 최신화 : `origin` submain to `local` submain
2. `local` dev/** 최신화 : `local` submain to `local` dev/**
3. `origin` dev/** 코드 푸쉬 : `local` dev/** to `origin` dev/**
4. `origin` submain 최신화 : `origin` dev/** to `origin` submian

<p style="align: center;"><img src="./img/git-branch.png" style="width: 600px;"></p>

<br><hr><br>

#### 1. `local` submain 최신화

```cmd
git switch submain
git fetch
git pull origin submain
```

<br><hr><br>

#### 2. `local` dev/** 최신화

```cmd
git switch dev/**
git merge submain
```

<br><hr><br>

#### 3. `origin` dev/** 코드 푸쉬

```cmd
git status
git add file-name
git commit -m 'commit-title' -m 'commit-description'
git push origin dev/**
```

<br><hr><br>

#### 4. `origin` submain 최신화

`브라우저`에서 Pull Request 를 생성하고 dev/** 에서 submain 으로 보내주세요.

그리고 팀원에게 공유해주세요.ㄴ