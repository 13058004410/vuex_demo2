import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //所有的任务数据都在这共享
        list:[],
        //文本框的内容
        inputValue:'aaa',
        //下一个ID
        nextId:5
    },
    mutations:{
        initList(state,list){
            state.list=list
        },
        //为store中的inputValue赋值
        setInputValue(state,val){
            state.inputValue=val
        },
        //添加列表项目
        addItem(state){
            const obj={
                id:state.nextId,
                info:state.inputValue.trim(),
                done:false
            }
            state.list.push(obj)
            state.nextId++
            state.inputValue=''
        },
        //根据id删除对应的任务事项
        removeItem(state,id){
            //根据id查找对应项的索引
            const i=state.list.findIndex(x=>x.id===id)
            //根据索引删除对应的元素
            if(i!=-1){
                state.list.splice(i,1)
            }
        },
        //修改列表项的选择状态
        changeStaus(state,param){
            const i=state.list.findIndex(x => x.id === param.id)
            if(i!=-1){
                state.list[i].done=param.status
            }
        }
    },
    actions:{
        getList(context){
            axios.get('/static/list.json').then(({data})=>{
                console.log(data)
                context.commit('initList',data)
            })
        }
    },
    getters:{}
})