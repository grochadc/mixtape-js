function moveItem(array, index, way) {
    var tempArray = array.splice(index,1);
      if(way){
            array.splice(index-1,0,tempArray[0]);
      }
      else {
             array.splice(index+1,0,tempArray[0]);
           }
      return array;
 }