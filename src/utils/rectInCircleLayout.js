import position2color from './position2color';

export default function rectInCircleLayout(viewWidth, cubeSize, recordCount, position) {
  let outerMargin = 20;

  // 算圈圈有多粗
  let borderWidth = Math.ceil(Math.sqrt(recordCount))*2;
  if(borderWidth < 2)
    borderWidth = 2;

  // 假設圈圈不會比view寬
  let numCol = Math.ceil(Math.sqrt(recordCount));
  let numRow = numCol;
  let rectWidth = numCol*cubeSize;
  let rectHeight = rectWidth;
  let radius = (rectWidth/2*Math.sqrt(2))*1.25 + borderWidth;
  let diameter = radius*2;

  let offsetLeft = (diameter - rectWidth)/2;
  let offsetTop = offsetLeft;

  // 確認circle沒有比view寬
  let toTranslate = '';
  if(diameter > viewWidth) {
    // 唉呀circle比view寬只好重算了哭哭
    // 先確定rect有沒有比view寬
    if(rectWidth > viewWidth) {
      // rect比view寬所以要重算circle大小
      rectWidth = Math.floor(viewWidth/cubeSize)*cubeSize;
      numCol = rectWidth/cubeSize;
      numRow = Math.ceil(recordCount/numCol);
      rectHeight = numRow*cubeSize;

      radius = Math.sqrt((rectWidth/2)*(rectWidth/2) + (rectHeight/2)*(rectHeight/2))*1.5
      diameter = radius*2;

      offsetLeft = (diameter - rectWidth)/2;
      offsetTop = (diameter - rectHeight)/2;
    }
    // 確定circle大小之後來算水平位移
    toTranslate = (diameter - viewWidth)/2 + outerMargin;
    toTranslate = `translateX(-${toTranslate}px)`;
  }

  // 算inline styles
  let marginStyles = {
    margin: `${outerMargin}px`,
  }
  let circleStyles = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: diameter,
    height: diameter,
    margin: `${borderWidth}px 0`,
    boxShadow: `0 0 0 ${borderWidth}px ${position2color(position)}`,
    borderRadius: '50%',
    transform: toTranslate,
  }
  let rectStyles = {
    position: 'absolute',
    top: `${offsetTop}px`,
    left: `${offsetLeft}px`,
    width: rectWidth,
    height: rectHeight,
  }

  return {
    margin: marginStyles,
    circle: circleStyles,
    rect: rectStyles,
  }
}
