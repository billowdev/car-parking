"use client"
import React, {useCallback, useEffect, useState, Fragment} from 'react'
import moment from 'moment';
import Swal from 'sweetalert2';

import { IAPIResponse } from '@/interfaces/user.interface';
import { IGetAllUserResponse } from '@/interfaces/user.interface';
import { getAllUsers } from '@/services/user.service';
import { IPaginationResponse } from '@/interfaces/common.interface';
import { Button, Card, Form, Input, Modal, Pagination, PaginationProps, Progress, Spin, Switch, Table, Upload, message } from 'antd';
import ConfigProviderPagination from '@/components/antd/ConfigProviderPagination';
type Props = {}

const initialPagination: IPagination = {
	page: 1,
	page_size: 10,
	total: 0,
	links: {
		next: "",
		previous: ""
	}
};

function UserManagement({}: Props) {
  const [data, setData] = useState<TableData[]>([]);
  const [current, setCurrent] = useState(1);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem("access") ?? "")

  useEffect(() => {
		const token = localStorage.getItem("access")
		if (token && token !== accessToken) {
			setAccessToken(token)
		}
	}, [accessToken])


  const fetchData = useCallback(async () => {
		try {
			const records: IAPIResponse<IPaginationResponse<IGetAllUserResponse[]>> = await getAllUsers(accessToken);

      console.log("--------------------------------")
      console.log(records)
      console.log("--------------------------------")
			const data = records.data.rows;
			const pagination = records.data;
			const transformedData = data.map((record, index) => ({
				...record,
				key: index.toString(),
			}));
			setData(transformedData);
			setPagination(pagination);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

  
	const handlePageChange: PaginationProps["onShowSizeChange"] = async (
		current,
		pageSize
	) => {
		setCurrent(current);
		let query: any = {
			page: `${current}`,
			page_size: `${pageSize}`,
		};
		const response = await getAllStations(query);
		const data = response.data
		const pagination = response.pagination
		const newData = data.map((info, index) => {
			const runningNumber = (current - 1) * pageSize + index + 1;
			return {
				...info,
				key: runningNumber,
			};
		}) as TableData[];
		setPagination(prevPagination => ({
			...prevPagination,
			page: pagination.page,
			page_size: pagination.page_size,
			total: pagination.total,
		}));
		setData(newData)
	}


  const columns = [
		{
			title: 'ชื่อ',
			dataIndex: 'name',
			key: 'name',
		},
    {
			title: 'ชื่อผู้ใช้',
			dataIndex: 'username',
			key: 'username',
		},
    {
			title: 'อีเมล',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'แก้ไขล่าสุด',
			dataIndex: 'updated_at',
			key: 'updated_at',
			render: (updatedAt: string): string => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
		},
		{
			title: '',
			key: 'action',
			render: (text: any, record: TableData) => (
				<Fragment>
					<Button type="link" onClick={() => handleEdit(record)}>
						แก้ไข
					</Button>
					<Button type="link" danger onClick={() => handleDelete(record)}>
                ลบ
            </Button>
				</Fragment>
			),
		},
	];

  const handleAdd = async ()=>{

  }
  
  return <Fragment>
  <Card
    bordered={false}
    className="criclebox tablespace mb-24"
    title="ตารางข้อมูลสมาชิก"
  >
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="primary" className='bg-blue-500 hover:bgblue-blue-700 border-blue-500 hover:border-blue-700' onClick={handleAdd}>
        เพิ่มสมาชิก
      </Button>
    </div>
    <div className="table-responsive">
      <Table
        
        rowKey={"id"}
        columns={columns}
        dataSource={data as IStationData[]}
        // pagination={pagination}
        className="ant-border-space"
        pagination={false}
      />
      <div className="flex justify-end mx-[56px] mt-[12px]">
        <ConfigProviderPagination>
          <Pagination
            showSizeChanger={true}
            showQuickJumper={true}
            current={current}
            total={pagination?.total}
            pageSize={pagination?.page_size}
            onChange={handlePageChange}
          />
        </ConfigProviderPagination>
      </div>
    </div>
    {/* <Modal
      title="เพิ่มสมาชิก"
      visible={addModalVisible}
      onCancel={handleAddModalCancel}
      footer={null}
    >
      <EditStationForm
        initialValues={null}
        onSubmit={handleAddModalOk} // Pass onSubmit function
        onCancel={handleAddModalCancel} // Pass onCancel function
      />
    </Modal>


    <Modal
      title="แก้ไขข้อมูลสมาชิก"
      visible={editModalVisible}
      onCancel={handleEditModalCancel}
      footer={null} // Hide OK button by not providing footer
    >
      <EditStationForm
        initialValues={currentEditRecord}
        onSubmit={handleEditModalOk} // Pass onSubmit function
        onCancel={() => { setEditModalVisible(false); }} // Pass onCancel function
      />
    </Modal> */}
  </Card>
</Fragment>
}

export default UserManagement