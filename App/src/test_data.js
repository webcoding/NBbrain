export default {
    home: {
        data: [{
                basic_message: {
                    nickname: 'mengyue',
                    user_id: '2222222',
                    headimgurl: '',
                    title: '战神'
                },
                qbank: {
                    qbank_id: '111111',
                    qbank_name: '题目名',
                    qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                    total_score: 40,
                    challenge_total: 110,
                    collect_total: 200
                }
            },
            {
                basic_message: {
                    nickname: 'mengyue',
                    user_id: '2222222',
                    headimgurl: '',
                    title: '战神'
                },
                qbank: {
                    qbank_id: '111111',
                    qbank_name: '题目名',
                    qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                    total_score: 40,
                    challenge_total: 110,
                    collect_total: 200
                }
            }
        ]
    },
    // 不能挑战自己
    rank: {
        data: [{
                user_id: '222222',
                nickname: '易水寒',
                headimgurl: '',
                title: '战神',
                scores: 50000, //总得分
                qbanks: 100, // 贡献题库数
                challenges: 200000, //挑战次数
            },
            {
                nickname: '萧奈',
                headimgurl: '',
                title: '战魁',
                scores: 48000, //总得分
                qbanks: 100, // 贡献题库数
                challenges: 180000, //挑战次数
            },
            {
                nickname: '梅超风',
                headimgurl: '',
                title: '花木兰',
                scores: 46000, //总得分
                qbanks: 100, // 贡献题库数
                challenges: 160000, //挑战次数
            }
        ]
    },
    // 自己的题目，不能挑战
    qbanksRank: {
        data: [
            {
                user_id: '222222',
                nickname: '萧奈',
                headimgurl: '',
                qbank_id: '11111',
                qbank_name: '题库名',
                qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                total_score: 40,
                challenge_total: 110,
                collect_total: 200
            },
            {
                user_id: '222222',
                nickname: '萧奈',
                headimgurl: '',
                qbank_id: '11111',
                qbank_name: '题库名',
                qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                total_score: 40,
                challenge_total: 110,
                collect_total: 200
            },
            {
                user_id: '222222',
                nickname: '萧奈',
                headimgurl: '',
                qbank_id: '11111',
                qbank_name: '题库名',
                qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                total_score: 40,
                challenge_total: 110,
                collect_total: 200
            }
        ]
    },
    // 共几题，共需时长，选项最少2个
    myQbanks: {
        data: [
            {
                qbank_id: '11111111',
                qbank_name: '题库名',
                qbank_material_url: 'http://localhost:3004/static/ranking.svg',
                total_question: 10,
                question_number: 3,
                // 编辑时，跳转到最后需要编辑的那个
                question_ids: [],
                // 0 未完成  1  已完成   2  审核中(已发布)   3审核通过
                complish_statue: 0  //已发布  [1/10]  [0/10]  审核中   审核通过
                // 去编辑
                // 去发布
                // 发布后---审核---审核通过-----推荐给好友挑战
            }
        ]
    }
}
