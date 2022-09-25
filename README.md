# 🔥canvas master
Learning Js Canvas
<br/><br/>
* 노마드코더님의 [바닐라 JS로 그림 앱 만들기](https://nomadcoders.co/javascript-for-beginners-2) 강의를 들으며 작성한 필기노트입니다.
그림판, meme-maker의 로직과 설명은 코드와 주석으로 존재합니다.
이 노트에선 본격적 프로젝트에 들어가기 앞서 배운 지식들만 정리했습니다.
<br/><br/><br/><br/>

# ✏️Basic

## 캔버스 만들기
```js
const canvas = document.querySelector("canvas"); //canvas 가져오기
const ctx = canvas.getContext("2d"); //canvas를 그리는 붓 만들기
canvas.width = 800; //캔버스 기본 너비 정하기 (css에서도 설정 필요)
canvas.height = 800; //캔버스 기본 높이 정하기 (css에서도 설정 필요)
```
<br/>

## 캔버스에 그리기
```js
//▪️ 색칠된 네모 만들기
// 방법01
ctx.fillRect(50, 50, 100, 100) //ctx.fillRect(시작할x좌표, 시작할y좌표, 너비, 높이)
// 방법02
ctx.rect(50, 50, 100, 100);
ctx.fill()
// 방법03
ctx.lineTo(100, 0); //(x:50,y:50) -> (150,50)으로 선긋기
ctx.lineTo(100, 100);
ctx.lineTo(0, 100);
ctx.lineTo(0, 0);
ctx.fill()


//▫️ 선으로된 네모 만들기
// 방법01
ctx.strokeRect(50, 50, 100, 200)
// 방법02
ctx.rect(50, 50, 100, 100);
ctx.stroke()
// 방법03
ctx.lineTo(100, 0); //(x:50,y:50) -> (150,50)으로 선긋기
ctx.lineTo(100, 100);
ctx.lineTo(0, 100);
ctx.lineTo(0, 0);
ctx.stroke()


//한번에 여러개 그리고 색칠하기
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill()
```
<br/>

## 컬러 지정하기
```js
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fillStyle = "red"
ctx.fill(); //빨간색 네모 세개 그려짐
```
<br/>

## context 이해하기
```js
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill(); //검은색 네모가 그려짐

ctx.beginPath(); //🛑이전 경로를 단절시키지 않으면 아래의 스타일이 위에까지 적용된다.
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red"; //beginPath 이후의 도형만 해당 컬러를 적용받는다.
ctx.fill(); //위엔 빨간색 물감만 찍어바른거고 여기까지 해야 그려짐
```
* ✂️ 이전 코드까지 영향받지 않도록 하기 위해선 새로운 도형을 그릴땐 ctx를 beginPath로 한번 끊었다 다시 시작해줘야한다.

<br/>

## 그릴 위치 조정하기:moveTo()
```js
ctx.moveTo(50,50); //그릴 위치에 브러쉬를 옮긴다.
ctx.lineTo() //그 위치에서부터 그리기 시작한다.
```
<br/>


## 점과점 연결해서 선 그리기:lineTo()
```js
ctx.moveTo(50,50); //그릴 위치에 브러쉬를 옮긴다.
ctx.lineTo(150, 50); //(x:50,y:50) -> (150,50)으로 선긋기
ctx.stroke()
```
<br/>


## 원그리기
```js
ctx.arc(250, 100, 50, 0, 2 * Math.PI); 
//원중심점 기준 (x위치,y위치,반지름,시작각,끝각)
//시작각과 끝각이 헷갈린다면 > https://www.w3schools.com/tags/canvas_arc.asp
ctx.fill()
```
<br/>


## 집모양 만들기 실습 🏠
```js
ctx.fillRect(200,200,50,200)
ctx.fillRect(400,200,50,200)
ctx.lineWidth = 2 //선두께 조절하기
ctx.fillRect(300,300,50,100)
ctx.moveTo(200,200)
ctx.lineTo(325,100)
ctx.lineTo(450,200)
ctx.fill()
ctx.stroke()
```
<br/>


## 사람 만들기 실습 🕺
```js
ctx.fillRect(210,200,15,100);
ctx.fillRect(360,200,15,100);
ctx.fillRect(260,200,60,200);

ctx.arc(290, 130, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = 'white';
ctx.arc(280, 120, 5, Math.PI, 2 * Math.PI);
ctx.arc(300, 120, 5, Math.PI, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.lineWidth = 4
ctx.strokeStyle = 'pink';
ctx.arc(290, 130, 20, 0, 1 * Math.PI);
ctx.stroke();
```