// antd form 最合适定义成类组件
class LangProperty extends Component {
    state = {
        platform: this.props.platform
    };

    render() {
        // 话题分类列表
        const labelNameAc = {
            "百家号": {
                appId: "AppID",
                appToken: "AppToken"
            },
            "今日头条": {
                appId: "账号",
                appToken: "密码"
            }
        };

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };

        const { getFieldDecorator } = this.props.form;

        const { platform } = this.state;

        return (

            <Form layout="inline">
                <Form.Item
                    label="平台"
                    style={{ width: "auto" }}
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator("platform", {
                            initialValue: platform,
                            normalize: (value) => {
                                this.setState({
                                    platform: value
                                });

                                return value;
                            }

                        })(
                            <Select
                                style={{ width: "100%" }}
                            >
                                {
                                    accountPlatForms && accountPlatForms.map(p => {
                                        return <Option value={p} key={p}>{p}</Option>

                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                {/* label 根据 platform 改变 */}
                <Form.Item label={labelNameAc[platform].appId}  {...formItemLayout} >
                    {
                        getFieldDecorator("appId", {
                            initialValue: appId,

                        })(<Input />)
                    }
                </Form.Item>

                <Form.Item label="属性名称：" >
                    {
                        getFieldDecorator('name', {
                            rules: [
                                { type: 'string', message: "请输入字符串" }
                            ]
                        })(<Input
                            style={{ width: "100px" }} />)
                    }
                </Form.Item>

                <Form.Item label="最大值：" >
                    {
                        getFieldDecorator("pMax", {
                            normalize: (value) => {
                                if (value < 0) {
                                    return 0;
                                }
                                return Number(value);
                            },
                            rules: [
                                { type: 'number', message: "请输入数字" }
                            ]
                        })(<Input
                            type={"number"}
                            style={{ width: "50px" }} />)
                    }
                </Form.Item>


                <Form.Item>
                    <Button
                        size={"small"} type={"primary"}
                        onClick={() => {
                            this.props.addProperty(this.props.form.getFieldsValue());
                            this.props.form.resetFields();
                        }}>添加</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({
    name: "LangProperty",
})(LangProperty)

// wrappedComponentRef 能够获取 form的引用，在父组件内。

export default class TplLang extends Component {
    tplModalOk = () => {
        const formValues = this.langForm.props.form.getFieldsValue();
        console.log(formValues);
    };

    render() {
        return (
            <>
                < LangForm
                    wrappedComponentRef={(form) => this.langForm = form}
                    name={name}
                    content={content}
                />
            </>
        )
    }
}


// hooks 的时间选择 函数组件，和 antd 结合用 getFieldDecorator 装饰，需要用 React.forwardRef 包装，
// 使他能 象征性的能接受 ref 引用。
function TimerRangef(props) {
    const { className, style, onChange, value, format, disabled, ...rest } = props;

    const [startTime, setStartTime] = React.useState(value.start || moment());
    const [endTime, setEndTime] = React.useState(value.end || moment());

    const Hours = Array.from(Array(24), (v, k) => k);
    const Minutes = Array.from(Array(60), (v, k) => k);
    const Seconds = Array.from(Array(60), (v, k) => k);

    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange(Object.assign({}, { start: value.start, end: value.end }, changedValue))
        }
    };

    const disableStartHours = () => {
        if (endTime) {
            let h = endTime.hour();
            return Hours.slice(h, Hours.length - 1)
        }
        return [];
    };

    const disableStartMinute = (h) => {
        if (endTime) {
            if (h < endTime.hour()) return [];
            let m = endTime.minute();
            return Minutes.slice(m, Minutes.length - 1);
        }
        return [];
    };

    const disableStartSecond = (h, m) => {
        if (endTime) {
            if (h > endTime.hour()) return [];
            if (m > endTime.minute()) return [];
            let s = endTime.second();
            return Seconds.slice(s, Seconds.length - 1);
        }
        return [];
    };

    const disableEndHours = () => {
        if (startTime) {
            let h = startTime.hour();
            return Hours.slice(0, h)
        }
        return [];
    };

    const disableEndMinute = (h) => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            let m = startTime.minute();
            return Minutes.slice(0, m);
        }
        return [];
    };

    const disableEndSecond = (h, m) => {
        if (startTime) {
            if (h > startTime.hour()) return [];
            if (m > startTime.minute()) return [];
            let s = startTime.second();
            return Seconds.slice(0, s);
        }
        return [];
    };

    return (
        <Row>
            <Col span={12}>
                <TimePicker
                    format={format}
                    disabled={disabled}
                    allowClear={false}
                    onChange={(time) => {
                        setStartTime(time);
                    }}
                    onOpenChange={(open) => {
                        if (!open) {
                            triggerChange({ start: startTime });
                        }
                    }}
                    value={startTime}
                    disabledHours={disableStartHours}
                    disabledMinutes={disableStartMinute}
                />
            </Col>
            <Col span={12}>
                <TimePicker
                    format={format}
                    disabled={disabled}
                    allowClear={false}
                    onChange={(time) => {
                        setEndTime(time);
                    }}
                    onOpenChange={(open) => {
                        if (!open) {
                            triggerChange({ end: endTime });
                        }
                    }}
                    value={endTime}
                    disabledHours={disableEndHours}
                    disabledMinutes={disableEndMinute}
                />
            </Col>

        </Row>
    )
}

export const TimerRange = forwardRef((props, ref) => {
    return <TimerRangef {...props} />
});