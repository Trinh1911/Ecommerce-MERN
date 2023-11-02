import { Col, Divider, Row } from 'antd'
import React from 'react'
import { FacebookFilled, GithubFilled, MailFilled, PhoneFilled, FlagFilled } from '@ant-design/icons';
import { FooterItem, FooterList } from './styles';
const Footer = () => {
    return (
        <div style={{ background: '#fff', padding: '20px 120px',boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'}}>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginTop: "30px" }}
            >
                <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} span={6}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', color: '#989393'}}>KT</span>
                    <span style={{marginTop: '5px', fontStyle: 'oblique', fontWeight: '300'}}>The wind is rising! we must try to live</span>
                </Col>
                <Col span={6}>
                    <FooterList>Chi Nhánh</FooterList>
                    <FooterItem><FlagFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Thủ Đô Hà Nội</span></FooterItem>
                    <FooterItem><FlagFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Thành Phố Hồ Chí Minh</span></FooterItem>
                </Col>
                <Col span={6}>
                    <FooterList>Liên Hệ</FooterList>
                    <FooterItem><MailFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>2051120325@ut.edu.vn</span></FooterItem>
                    <FooterItem><PhoneFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>0915855193</span></FooterItem>
                </Col>
                <Col span={6}>
                    <FooterList>Mạng Xã Hội</FooterList>
                    <FooterItem><FacebookFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Nguyễn Thị Kim Trinh</span></FooterItem>
                    <FooterItem><GithubFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Trinh1911</span></FooterItem>
                </Col>
            </Row>
            <Divider/>
        </div>
    )
}

export default Footer