import * as React from 'react';
import VideoBanner from 'src/components/video/VideoBanner';
import VideoCardList from 'src/components/video/VideoCardList';

class VideoCardListContainer extends React.Component<{}> {
  public render() {
    const exaple = [
      {
        title: '타이틀1',
        views: 10000,
        date: '1년전',
        descrition: '내용1',
      },
      {
        title: '타이틀2',
        views: 10000,
        date: '1년전',
        descrition: '내용2',
      },
      {
        title: '타이틀3',
        views: 10000,
        date: '1년전',
        descrition: '내용3',
      },
      {
        title: '타이틀4',
        views: 10000,
        date: '1년전',
        descrition: '내용4',
      },
    ];

    return (
      <React.Fragment>
        <VideoBanner videos={exaple} />
        <VideoCardList />
      </React.Fragment>
    );
  }
}

export default VideoCardListContainer;
