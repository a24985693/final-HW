const storageMethods = {
  save(item) {
    // 先把要存的item轉成JSON字串 這邊會存產品id
    const favoriteString = JSON.stringify(item);
    localStorage.setItem('favorite', favoriteString);
  },
  get() {
    // 可以用JSON.parse()將JSON字串轉換成JavaScript的數值或是物件
    return JSON.parse(localStorage.getItem('favorite'));
  },
};

export function getFavoriteIdArr() {
  const favoriteIdArr = storageMethods.get('favorite') || [];
  return favoriteIdArr;
}

export function toggleIcon(id) {
  const favoriteIdArr = getFavoriteIdArr();
  if (favoriteIdArr.includes(id)) {
    console.log('收藏');
    return 'fa-solid fa-heart';
  }
  console.log('取消收藏');
  return 'fa-regular fa-heart';

  // const favoriteIdArr = getFavoriteIdArr();
  // console.log(234);
  // if (favoriteIdArr.includes(id)) {
  //   return 'fa-solid fa-heart';
  // }
  // return 'fa-regular fa-heart';
}

export function toggleFavorite(item) {
  const favoriteIdArr = getFavoriteIdArr();
  if (favoriteIdArr.includes(item.id)) {
    favoriteIdArr.splice(favoriteIdArr.indexOf(item.id), 1);
  } else {
    favoriteIdArr.push(item.id);
  }
  storageMethods.save(favoriteIdArr);
  console.log(localStorage);
  // toggleIcon(item.id);
}
