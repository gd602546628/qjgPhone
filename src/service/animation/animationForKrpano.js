/**
 * Created by gd on 2018/1/12/012.
 */
import Tween from './tween'

function animation(setFunction, targetObj, currentObj, duration, easing, callBack) {
  let getValue = null
  let easingArr = easing.split('.')
  if (easingArr.length === 1) {
    getValue = function (t, b, c, d) {
      return Tween[easingArr[0]](t, b, c, d)
    }
  } else if (easingArr.length === 2) {
    getValue = function (t, b, c, d) {
      return Tween[easingArr[0]][easingArr[1]](t, b, c, d)
    }
  }

  let start = 0
  let targetArr = []
  for (let key in targetObj) {
    targetArr.push({
      target: targetObj[key],
      current: currentObj[key],
      attr: key
    })
  }
  function step() {
    let dura = Math.ceil(duration / 17)
    if (start <= dura) {
      let params = []
      targetArr.forEach(item => {
        let {target, current, attr} = item
        let value = getValue(start, current, target - current, dura)
        params.push(value)
      })
      setFunction(params[0], params[1])
      start++
      requestAnimationFrame(step)
    } else {
      callBack && callBack()
    }
  }

  step()
}
export default animation
