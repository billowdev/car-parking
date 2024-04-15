import React from "react";
import { Table, Button, Radio, Card, Upload } from "antd";
import { ColumnsType } from "antd/es/table";
import { ToTopOutlined } from "@ant-design/icons";
// Making the component generic
interface TableComponentProps<T> {
  title: string;
  columns: ColumnsType<T>;
  data: T[];
  onEdit?: (record: T) => void;
  onDelete?: (id: string) => void; // Assuming 'id' is a string. Adjust if your identifier has a different type
}

const TableComponent = <T extends { id?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  title,
}: TableComponentProps<T>) => {
  const combinedColumns = columns;
  const paginationConfig = {
    pageSize: 10,
  };
  return (
    <Card bordered={false} className="criclebox tablespace mb-24" title={title}>
      <div className="table-responsive">
        <Table
          columns={combinedColumns}
          dataSource={data as any} // Type assertion may be necessary due to Ant Design's Table expecting certain types
          pagination={paginationConfig}
          className="ant-border-space"
        />
      </div>
    </Card>
  );
};

export default TableComponent;
