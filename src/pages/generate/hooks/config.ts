import { TextGenerateList,FormParamObj } from "../types"

const replyColumns = [[
  {
    label: '常规回复',
    id: 0
  },
  {
    label: '学术型',
    id: 1
  },
  {
    label: '幽默型',
    id: 2
  },
  {
    label: '争论好辩型',
    id: 3
  },
  {
    label: '创造力型',
    id: 4
  },
  {
    label: '新闻型',
    id: 5
  },
  {
    label: '诗意型',
    id: 6
  },
  {
    label: '技术型',
    id: 7
  }
]]

const replyFormObj:FormParamObj = {
  form: [
    {
      label: '回复内容',
      prop: 'replyContent',
      required: true,
      type: 'input'
    },
    {
      label: '回复风格',
      prop: 'style',
      required: true,
      type: 'picker',
      propData: replyColumns
    }
  ],
  rules: {
    'replyContent': {
      type: 'string',
      required: true,
      message: '请填写回复内容',
      trigger: ['blur']
    },
    'style': {
      type: 'string',
      required: true,
      message: '请选择回复风格',
      trigger: ['blur', 'change']
    },
  }
}

const textColumns = [[
  {
    label: '新闻风格',
    id: 0
  },
  {
    label: '文艺风格',
    id: 1
  },
  {
    label: '广告营销风格',
    id: 2
  },
  {
    label: '故事风格',
    id: 3
  },
  {
    label: '诗歌风格',
    id: 4
  },
  {
    label: '接地气风格',
    id: 5
  },
  {
    label: '治愈系风格',
    id: 6
  },
  {
    label: '沙雕风格',
    id: 7
  },
]]

const textFormObj:FormParamObj = {
  form: [
    {
      label: '文案内容',
      prop: 'textContent',
      required: true,
      type: 'input'
    },
    {
      label: '文案风格',
      prop: 'style',
      required: true,
      type: 'picker',
      propData: textColumns
    }
  ],
  rules: {
    'textContent': {
      type: 'string',
      required: true,
      message: '请填写文案内容',
      trigger: ['blur']
    },
    'style': {
      type: 'string',
      required: true,
      message: '请选择文案风格',
      trigger: ['blur', 'change']
    },
  }
}

export const textGenerateList: TextGenerateList[] = [
  {
    name: '直播脚本',
    key: 'live',
    selectData: [
      {
        label: '主播',
        image: '/static/image/generate/zhubo.png',
        form: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            propData: ['男', '女'],
            required: true
          },
          {
            label: '直播风格',
            prop: 'role_type',
            type: 'picker',
            propData: [[
              {
                label: '本地生活',
                id: 0
              },
              {
                label: '电商',
                id: 1
              },
              {
                label: '娱乐',
                id: 2
              },
              {
                label: '知识',
                id: 3
              },
              {
                label: '美妆',
                id: 4
              }
            ]]
          }
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur']
          },
          'gender': {
            type: 'string',
            required: true,
            message: '请选择性别',
            trigger: ['blur', 'change']
          },
        }
      },
      {
        label: '助播',
        image: '/static/image/generate/zhubo1.png',
        form: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            propData: ['男', '女'],
            required: true
          },
          {
            label: '助播风格',
            prop: 'role_type',
            type: 'picker',
            propData: [[
              {
                label: '沉稳',
                id: 0
              },
              {
                label: '幽默风趣',
                id: 1
              },
              {
                label: '随和',
                id: 2
              },
              {
                label: '追求完美',
                id: 3
              },
              {
                label: '创新',
                id: 4
              },
              {
                label: '传统',
                id: 5
              },
            ]]
          }
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur']
          },
          'gender': {
            type: 'string',
            required: true,
            message: '请选择性别',
            trigger: ['blur', 'change']
          },
        }
      },
      {
        label: '店员',
        image: '/static/image/generate/dianyuan.png',
        form: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            propData: ['男', '女'],
            required: true
          },
          {
            label: '店员风格',
            prop: 'role_type',
            type: 'picker',
            propData: [[
              {
                label: '沉稳',
                id: 0
              },
              {
                label: '幽默风趣',
                id: 1
              },
              {
                label: '随和',
                id: 2
              },
              {
                label: '追求完美',
                id: 3
              },
              {
                label: '创新',
                id: 4
              },
              {
                label: '传统',
                id: 5
              },
            ]]
          }
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur']
          },
          'gender': {
            type: 'string',
            required: true,
            message: '请选择性别',
            trigger: ['blur', 'change']
          },
        }
      },
      {
        label: '老板',
        image: '/static/image/generate/laoban.png',
        form: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            propData: ['男', '女'],
            required: true
          },
          {
            label: '老板风格',
            prop: 'role_type',
            type: 'picker',
            propData: [[
              {
                label: '沉稳',
                id: 0
              },
              {
                label: '幽默风趣',
                id: 1
              },
              {
                label: '随和',
                id: 2
              },
              {
                label: '追求完美',
                id: 3
              },
              {
                label: '创新',
                id: 4
              },
              {
                label: '传统',
                id: 5
              },
            ]]
          }
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur']
          },
          'gender': {
            type: 'string',
            required: true,
            message: '请选择性别',
            trigger: ['blur', 'change']
          },
        }
      },
    ],
    multipleInfo: [
      {
        label: '企业风格特色',
        form: [
          {
            label: '企业名称',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '企业基础信息',
            prop: 'basics_massage',
            type: 'input'
          },
          {
            label: '企业服务特色',
            prop: 'style',
            type: 'input'
          },
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写企业名称',
            trigger: ['blur']
          }
        }
      },
      {
        label: '产品介绍',
        form: [
          {
            label: '产品名称',
            prop: 'name',
            required: true,
            type: 'input'
          },
          {
            label: '产品描述',
            prop: 'massage',
            type: 'input'
          },
          {
            label: '核心特色',
            prop: 'style',
            type: 'input'
          },
          {
            label: '产品价格',
            prop: 'pirce',
            type: 'input'
          }
        ],
        rules: {
          'name': {
            type: 'string',
            required: true,
            message: '请填写产品名称',
            trigger: ['blur']
          }
        }
      }
    ],
    multipleInfoEntity: [
      {
        label: '店铺',
        form: [
          {
            label: '店铺名称',
            prop: 'shopName',
            required: true,
            type: 'input'
          },
          {
            label: '所属行业',
            prop: 'shopIndnstry',
            type: 'input'
          },
          {
            label: '商铺地址',
            prop: 'shopAddress',
            type: 'input'
          },
        ],
        rules: {
          'shopName': {
            type: 'string',
            required: true,
            message: '请填写店铺名称',
            trigger: ['blur']
          }
        }
      },
      {
        label: '套餐',
        form: [
          {
            label: '套餐名称',
            prop: 'setMealName',
            required: true,
            type: 'input'
          },
          {
            label: '套餐链接',
            prop: 'setMealLink',
            type: 'input'
          },
          {
            label: '套餐描述',
            prop: 'setMealDescribe',
            type: 'input'
          },
          {
            label: '套餐价格',
            prop: 'setMealPrice',
            type: 'input'
          },
          {
            label: '优惠力度',
            prop: 'setMealDiscount',
            type: 'input'
          }
        ],
        rules: {
          'setMealName': {
            type: 'string',
            required: true,
            message: '请填写店铺名称',
            trigger: ['blur']
          }
        }
      }
    ],
    scriptStyle: [
      {
        label: '脚本风格',
        form: [
          {
            label: '脚本风格',
            prop: 'script_style',
            type: 'picker',
            propData: [[
              {
                label: '武侠风',
                id: 0
              },
              {
                label: '文学风',
                id: 1
              },
              {
                label: '浪漫主义',
                id: 2
              },
              {
                label: '相声风',
                id: 3
              },
              {
                label: '美食介绍风',
                id: 4
              }
            ]]
          },
          {
            label: '自定义脚本风格',
            prop: 'customScriptStyle',
            type: 'input'
          }
        ],
      }
    ],
    steps: [
      {
        label: '选择身份'
      },
      {
        label: '填写身份信息'
      },
      {
        label: '填写企业信息'
      },
      {
        label: '填写产品信息'
      },
      {
        label: '脚本风格'
      }
    ],
    multipleSlect: true
  },
  {
    name: '回复脚本',
    key: 'reply',
    selectData: [
      {
        label: '产品回复',
        ...replyFormObj
      },
      {
        label: '地址回复',
        ...replyFormObj
      }
    ],
    steps: [
      {
        label: '选择类型'
      },
      {
        label: '选择风格'
      }
    ]
  },
  {
    name: '文案脚本',
    key: 'text',
    selectData: [
      {
        label: '文案脚本',
        ...textFormObj
      }
    ]
  },
  {
    name: '短视频脚本',
    key: 'video',
    selectData: [
      {
        label: '提纲脚本',
      },
      {
        label: '信息脚本',
      },
      {
        label: '故事脚本',
      },
      {
        label: '创意脚本',
      },
      {
        label: '文学脚本',
      }
    ],
    steps:[
      {
        label: '选择类型'
      },
      {
        label: '选择脚本'
      }
    ]
  }
]

const chatErrorText = ['对不起','很抱歉','非常抱歉','抱歉']

export const testChatError = (text:string) => {
  return chatErrorText.some(el => text.startsWith(el))
}