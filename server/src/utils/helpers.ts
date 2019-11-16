export const areArrayEqual = (arr1: any[], arr2: any[]) => {
  const obj1 = arryToObj(arr1);
  const obj2 = arryToObj(arr2);

  return allValuesInArrayPresentInObject(arr1, obj2) && allValuesInArrayPresentInObject(arr2, obj1);
}

const arryToObj = (arr: any[]) => {
  const obj:any = {};
  for(let i in arr) {
    obj[i] = 1;
  }
  return obj;
}

const allValuesInArrayPresentInObject = (arr: any[], obj: any) => {
  let flag = true;
  for(let i in arr) {
    if(!obj[i]) {
      flag = false;
      break;
    }
  }
  return flag;
}
