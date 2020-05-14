const data = [
  {
    id: 1,
    title: 'Brand new title',
    author: 'John Doe',
    plot: 'The man tries to complete his 12th hw',
    img: 'https://picsum.photos/200/300'
  },
  {
    id: 2,
    title: 'Old one',
    author: 'New SChool',
    plot: 'how about a cup of tea today?',
    img: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    title: 'How beautiful theyre',
    author: 'Animal Flying',
    plot:
      'Every day and every minute some malicious things happens to every man on a planet',
    img: 'https://picsum.photos/200/300'
  }
];

localStorage.setItem('data', JSON.stringify(data));
