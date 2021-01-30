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
    message.success('Log in successfully');
};
const sent = () => {
    message.success('Please check email');
};
const error = () => {
    message.error('The passwords don\'t match');
};
const v_wrong = () => {
    message.error('Verification code error');
};
const timeout = () => {
    message.error('The captcha has expired');
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
        <FormItem className="form_title" {...tailLayout} style={{textAlign:"left",marginLeft:"45px"}}>Change the password</FormItem>
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
        <FormItem label="Verification code">
            <Input placeholder="Please enter a verification code" maxLength={10} onChange={(event)=>{
                setV_code(event.target.value)
            }}/>
        </FormItem>
        <FormItem {...tailLayout} >
            <Button type="primary" style={{width:"200px",left:"-%50"}} className='button' onClick={()=>{
                send(window.localStorage.id)
                sent()
            }}>Send verification code</Button>
        </FormItem>
        <FormItem {...tailLayout} style={{textAlign:"left"}}>
            <Button style={{width:"90px"}} type="primary" onClick={()=>{
                if (password===confirm){
                    change(password,v_code).then((response)=>{
                        if (response.data===-2){
                            v_wrong()
                        }else if (response.data===-3){
                            timeout()
                        }else {
                            history.push('/assignments');
                            success()
                        }
                    })
                }else {
                    error()
                }

            }}>Change the password</Button>
        </FormItem>
        <FormItem {...tailLayout} style={{textAlign:"left"}}>
            <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                window.localStorage.current = 'assignments';
                history.push('/assignments')
            }}>return</Button>
        </FormItem>
    </Form>
    </div>
            ] : null}
        </QueueAnim>
    </div>
}

function change(password,v_code) {
    const sid = window.localStorage.id;
    window.localStorage.current = 'assignments';
    axios.defaults.withCredentials = true;
    return axios.get('/api/user/resetPwd',{
        params:{
            sid:sid,
            v_code:v_code,
            pwd:password
        }
    });
}
function send(sid) {
    axios.defaults.withCredentials = true;
    return axios.get('/api/user/sendVerifyCode',{
        params:{
            sid
        }
    });
}