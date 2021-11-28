// import { Button } from 'antd';

export const ADMIN_TABLE_CONSTANT = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'ViewCount',
    dataIndex: 'viewCount',
    key: 'viewCount',
  },
  {
    title: 'Operation',
    dataIndex: '',
    key: 'x',
    render: () => (
      <div>
        <a>編集</a>
        <a>削除</a>
      </div>
		),
  },
];
