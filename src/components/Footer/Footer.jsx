import { Col, Divider, Row } from 'antd'
import React from 'react'
import { FacebookFilled, GithubFilled, MailFilled, PhoneFilled, FlagFilled } from '@ant-design/icons';
import { ContainerFooter, FooterItem, FooterList, WrapperFooter } from './styles';
const Footer = () => {
    return (
        <ContainerFooter >
            <WrapperFooter
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
                <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} xs={24} xl={6}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', color: '#004146'}}>KT</span>
                    <span style={{marginTop: '5px', fontStyle: 'oblique', fontWeight: '300', color: '#004146'}}>The wind is rising! we must try to live</span>
                </Col>
                <Col xs={24} xl={6}>
                    <FooterList>Chi Nhánh</FooterList>
                    <FooterItem><FlagFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Thủ Đô Hà Nội</span></FooterItem>
                    <FooterItem><FlagFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Thành Phố Hồ Chí Minh</span></FooterItem>
                </Col>
                <Col xs={24} xl={6}>
                    <FooterList>Liên Hệ</FooterList>
                    <FooterItem><MailFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>2051120325@ut.edu.vn</span></FooterItem>
                    <FooterItem><PhoneFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>0915855193</span></FooterItem>
                </Col>
                <Col xs={24} xl={6}>
                    <FooterList>Mạng Xã Hội</FooterList>
                    <FooterItem><FacebookFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Nguyễn Thị Kim Trinh</span></FooterItem>
                    <FooterItem><GithubFilled style={{color:"#000", paddingRight: '5px', fontSize: '15px'}}/> <span>Trinh1911</span></FooterItem>
                </Col>
            </WrapperFooter>
            <Divider/>
            <span style={{display: "block",textAlign: 'center', color:"#8d8d8d", fontSize: "12px", fontWeight: "400"}}>@2023 - Nguyễn Thị Kim Trinh</span>
        </ContainerFooter>
    )
}

export default Footer