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
            label: '爱好',
            prop: 'hobby',
            type: 'input'
          },
          {
            label: '籍贯',
            prop: 'nativePlace',
            type: 'input'
          },
          {
            label: '星座',
            prop: 'constellation',
            type: 'input'
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input'
          },
          {
            label: '从业经历',
            prop: 'experience',
            type: 'input'
          },
          {
            label: '毕业大学',
            prop: 'university',
            type: 'input'
          },
          {
            label: '主播风格',
            prop: 'style',
            type: 'picker',
            propData: [[
              {
                label: '娱乐主播',
                id: 0
              },
              {
                label: '知识主播',
                id: 1
              },
              {
                label: '美妆主播',
                id: 2
              },
              {
                label: '情感主播',
                id: 3
              },
              {
                label: '常规主播',
                id: 4
              },
              {
                label: '说唱主播',
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
        label: '助播',
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
            label: '爱好',
            prop: 'hobby',
            type: 'input'
          },
          {
            label: '籍贯',
            prop: 'nativePlace',
            type: 'input'
          },
          {
            label: '星座',
            prop: 'constellation',
            type: 'input'
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input'
          },
          {
            label: '从业经历',
            prop: 'experience',
            type: 'input'
          },
          {
            label: '毕业大学',
            prop: 'university',
            type: 'input'
          },
          {
            label: '助播风格',
            prop: 'style',
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
            label: '爱好',
            prop: 'hobby',
            type: 'input'
          },
          {
            label: '籍贯',
            prop: 'nativePlace',
            type: 'input'
          },
          {
            label: '星座',
            prop: 'constellation',
            type: 'input'
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input'
          },
          {
            label: '从业经历',
            prop: 'experience',
            type: 'input'
          },
          {
            label: '毕业大学',
            prop: 'university',
            type: 'input'
          },
          {
            label: '店员风格',
            prop: 'style',
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
            label: '爱好',
            prop: 'hobby',
            type: 'input'
          },
          {
            label: '籍贯',
            prop: 'nativePlace',
            type: 'input'
          },
          {
            label: '星座',
            prop: 'constellation',
            type: 'input'
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input'
          },
          {
            label: '从业经历',
            prop: 'experience',
            type: 'input'
          },
          {
            label: '毕业大学',
            prop: 'university',
            type: 'input'
          },
          {
            label: '老板风格',
            prop: 'style',
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
            prop: 'enterpriseName',
            required: true,
            type: 'input'
          },
          {
            label: '企业主要服务内容',
            prop: 'enterpriseContent',
            type: 'input'
          },
          {
            label: '企业历史',
            prop: 'enterpriseHistory',
            type: 'input'
          },
          {
            label: '企业成就',
            prop: 'enterpriseAchievement',
            type: 'input'
          },
          {
            label: '场地环境',
            prop: 'enterpriseEnvironment',
            type: 'input'
          },
          {
            label: '特色内容',
            prop: 'specialContent',
            type: 'input'
          },
        ],
        rules: {
          'enterpriseName': {
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
            prop: 'productName',
            required: true,
            type: 'input'
          },
          {
            label: '产品功能',
            prop: 'productFunction',
            type: 'input'
          },
          {
            label: '产品特色',
            prop: 'productSpecial',
            type: 'input'
          },
          {
            label: '产品价格',
            prop: 'productPrice',
            type: 'input'
          },
          {
            label: '产品外观',
            prop: 'productAppearance',
            type: 'input'
          },
          {
            label: '产品品质',
            prop: 'productQuality',
            type: 'input'
          },
          {
            label: '相关服务',
            prop: 'relatedService',
            type: 'input'
          }
        ],
        rules: {
          'productName': {
            type: 'string',
            required: true,
            message: '请填写产品名称',
            trigger: ['blur']
          }
        }
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