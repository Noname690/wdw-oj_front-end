import React,{useState} from 'react'
import {Form,Input,Button,message} from "antd";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import '../style/login.css'
import '../style/change.css'
import '../style/font.css'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;
const success = () => {
    message.success('modify successfully');
};
const error = () => {
    message.error('The passwords don\'t match');
};
export default function Change_pwd() {
    const [show] = useState(true)
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const [v_code,setV_code] = useState('');
    const history = useHistory();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return<div className='wrapper'>
        <div style={{height:"130px"}}/>
        <QueueAnim
            key="demo"
            type={['top', 'bottom']}
            duration = "1400"
            ease={['easeOutQuart', 'easeInOutQuart']}>
            {show ? [
                <div className='frame_change' key="demo1">
                    <Form {...layout} className='login-form'>
                        <FormItem className="form_title" {...tailLayout} style={{textAlign:"left",marginLeft:"45px"}}>修改密码</FormItem>
                        <FormItem label="new password">
                            <Input placeholder="Please enter a new password" maxLength={10} type={"password"} onChange={(event)=>{
                                setPassword(event.target.value)
                            }}/>
                        </FormItem>
                        <FormItem label="Confirm the new password">
                            <Input placeholder="Please confirm the new password" maxLength={10} type={"password"} onChange={(event)=>{
                                setConfirm(event.target.value)
                            }}/>
                        </FormItem>
                        <FormItem {...tailLayout} style={{textAlign:"left"}}>
                            <Button style={{width:"90px"}} type="primary" onClick={()=>{
                                if (password===confirm){
                                    change(password,v_code).then((response)=>{
                                            history.push('/admin_users');
                                            success()
                                    })
                                }else {
                                    error()
                                }
                            }}>change password</Button>
                        </FormItem>
                        <FormItem {...tailLayout} style={{textAlign:"left"}}>
                            <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                window.localStorage.current = 'admin_users';
                                history.push('/admin_users')
                            }}>return</Button>
                        </FormItem>
                    </Form>
                </div>
            ] : null}
        </QueueAnim>
    </div>
}

function change(password) {
    window.localStorage.current = 'admin_users';
    axios.defaults.withCredentials = true;
    return axios.get('/api/admin/resetPwd',{
        params:{
            sid:window.localStorage.changeId,
            pwd:password
        }
    });
}