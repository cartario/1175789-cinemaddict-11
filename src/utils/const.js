const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const AUTHORS = [`Sergey O'Reilly`, `Tim Lee`, `Marina O'Mara`, `Natasha Walker`,
  `Fedor Lee`, `A Ivanov`, `Ivan Walker`];

const COMMENTS = [`I fell asleep at the minute two of the film... but later I've woken up... film has nothing to do with it I just felt tired... actually, film is okay... ish.`,
  `a film that changed my life, a true masterpiece, love camera work.`,
  `a true masterpiece, I fell asleep at the minute two of the film... but later I've woken up... film has nothing to do with it I just felt tired... actually, film is okay... ish, m`,
  `a film that changed my life, my friend and I went to watch this movie and never made it there so we didn't like it at all, I know what film is gonna win Oscar this year.`,
  `I fell asleep at the minute two of the film... but later I've woken up... film has nothing to do with it I just felt tired...`
];

const DATES = [`2020-05-26T17:50:50.021Z`,
  `2020-05-29T06:04:59.136Z`,
  `2020-05-25T21:46:34.682Z`,
  `2020-05-18T07:14:40.693Z`,
  `2020-05-19T15:17:25.064Z`
];

const EMOTIONS = [`sleeping`,
  `puke`,
  `smile`,
  `angry`];

export const generateComment = () => {
  return {
    author: getRandomArrayItem(AUTHORS),
    date: getRandomArrayItem(DATES),
    comment: getRandomArrayItem(COMMENTS),
    emotion: getRandomArrayItem(EMOTIONS),
    id: getRandomInt(950000, 951000),
  };
};

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


