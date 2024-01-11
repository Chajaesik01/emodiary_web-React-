import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import '../css/board.css';
import Modal from 'react-modal';
import { DataGrid } from "@mui/x-data-grid";
import { Pagination } from "antd";
import Customdate from './Customdatepicker'

Modal.setAppElement('#root') // 모달 관련 알림을 방지하기 위한 설정입니다.

const columns=[
    {field: 'id',headerName: "주문번호",width: 130,align:'center'},
    {field: 'orderTime',headerName: "주문시간",width: 200},
    {field: 'userId',headerName: "주문자 ID",width: 150},
    {
        field: 'orderStatus',
        headerName: '발주 상태',
        width: 150,
    },
    {
        field: 'currentStatus',
        headerName: '주문상태',
        width: 150,
    },
]

export default class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state={
            allRows:[],
            rows:[],
            startDate: null,
            endDate: null,
        };
    }
    componentDidMount(){
        const fetchData=async()=>{
            try{
                //const response=await fetch('http://localhost');
                const responseData = [
                    //{id: 7, orderTime: "2023.11.30 16:48", userId: "12341", orderStatus: "주문중", currentStatus: "주문중"},
                    {id:6,orderTime:"2023.11.29 01:12",userId:"lyt1015",orderStatus:"제작중",currentStatus:"제작중"},
                    {id:5,orderTime:"2023.11.25 01:12",userId:"lyt1015",orderStatus:"제작중",currentStatus:"제작중"},
                    {id:4,orderTime:"2023.11.23 01:12",userId:"lyt1015",orderStatus:"제작완료",currentStatus:"배송중"},
                    {id:3,orderTime:"2023.11.11 01:12",userId:"lyt1015",orderStatus:"제작완료",currentStatus:"배송완료"},
                    {id:2,orderTime:"2023.10.30 01:12",userId:"lyt1015",orderStatus:"제작완료",currentStatus:"배송완료"},
                    {id:1,orderTime:"2023.09.30 01:12",userId:"lyt1015",orderStatus:"제작완료",currentStatus:"배송완료"},
                ];
                const jsonString=JSON.stringify(responseData);
                const response=JSON.parse(jsonString);
                //const data = await response.json();
                //const newRows=[...this.state.rows,...response];
                const newRows=[...this.state.rows,...response];

                this.setState({
                    allRows:newRows,
                    rows:newRows,
                });
            }catch(error){
                console.error('Error fetching data:',error);
            }
        }
        fetchData();
    }

    handleSearch = () => {
        const { allRows, startDate, endDate } = this.state;
        const fetchData=async()=>{
            try{
                const reponse=await fetch('');
                const data=await response.json();
                this.setState({
                    rows:data,
                });
            }catch(error){
                console.error('Error fetching data:',error);
            }
        }
    };
  
    handleReset = () => {
        const { allRows } = this.state;
        this.setState({
          rows: allRows,
          startDate: null,
          endDate: null,
        });
    };
  
    handleStartDateChange = (date) => {
        this.setState({
          startDate: date,
        });
    };
  
    handleEndDateChange = (date) => {
        this.setState({
          endDate: date,
        });
    };
  
    render() {
        const {rows}=this.state;
        return(
            <>
            <div className="board-search">
                <div className="write">
                    주문관리
                </div>
                <div className="write">
                    <div style={{ marginTop: '20px' }}>주문일</div>
                        <Customdate/>
                        <button className="search-button" onClick={this.handleSearch}>조회</button>
                        <button className="reset-button" onClick={this.handleReset}>초기화</button>
                </div>
            </div>
            <div className="orderList">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination:{
                            paginationModel:{pageSize:10,page:0},
                        },
                    }}
                     checkboxSelection
                />
            </div>
            </>
        );
    }
}