import { Button } from 'antd';

const ADMIN_TABLE_CONSTANT = [
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
    dataIndex: 'view_count',
    key: 'view_count',
  },
  {
    title: 'Update',
    dataIndex: '',
    key: 'x',
    render: () => (
      <Button
        value=""
        type="primary"
        shape="round"
      />
),
  },
];
