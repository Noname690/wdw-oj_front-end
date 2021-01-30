import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import Guide from "../components/guide";
import logo from './logo.png';
import './layout.css';
import {Layout, Card,  Button} from "antd";
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import 'github-markdown-css'
import '../style/otto.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/solarized.css';

export default function Submit() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const [questionName,setQuestionName] = useState('');
    const [description,setDescription] = useState('');
    const [output,setOutput] = useState([]);
    const [code,setCode] = useState('');
    const { Header,Content,Sider }= Layout;
    const history = useHistory();
    useEffect(()=>{
        const now = Date.now()
        if (timer===0) {
            axios.get('/api/user/selectQuestionsById', {
                params: {
                    question_id:window.localStorage.recordQuestionId
                }
            }).then((response) => {
                setQuestionName(response.data.question_name);
                setDescription(response.data.question_description)
                setOutput(response.data.question_output)
                setTimer(now)
            })
             axios.get('api/user/selectRecordById',{
                params: {
                    record_id:window.localStorage.recordId
                }
            }).then((response) => {
                console.log(response.data.record_code)
                setCode(response.data.record_code);
                window.localStorage.kkkk=response.data.record_code
                console.log(code)
            })
        }
    })
    return<Layout>
        <Header  className="header">
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><Guide/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'700px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['right', 'left']}
                        duration = "2000"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card key="demo1" title="question name"  >
                                <div dangerouslySetInnerHTML={{ __html: questionName }} />
                            </Card>,
                            <div style={{padding:'3px'}}/>,
                            <Card key="demo2" title="question description">
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </Card>,
                            <div style={{padding:'3px'}}/>,
                            <Card key="demo3" title="output">
                                <div dangerouslySetInnerHTML={{ __html: output }} />
                            </Card>,
                            <div style={{height:'10px'}}/>,
                            <div style={{padding:'3px'}}/>,
                            <Card title="submitted code">
                                {code}
                            </Card>
                            // <div>{code}</div>,
                            // <CodeMirror
                            //     defaultValue={code}
                            //     options={{
                            //         // lineNumbers:true,
                            //         // mode:{name:"text/javascript"},
                            //         // extraKeys:{"Ctrl":"autocomplete"},
                            //         // autofocus:true,
                            //         // styleActiveLine:true,
                            //         // lineWrapping:true,
                            //         // foldGutter:true,
                            //         // gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter']
                            //         lineNumbers: true,                     //显示行号
                            //         mode: {name: "text/x-mysql"},          //定义mode
                            //         extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置
                            //         theme: "solarized",
                            //     }}/>
                            ,
                            <Button key="demo6" style={{ width: 120,left:800 ,top:15}} type="primary" className='button' onClick={()=>{
                                history.push('/records');
                            }}>return</Button>,
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}
