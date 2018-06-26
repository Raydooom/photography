import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        imgNames: [],
        total: "",
        currentStep: "",
        uploadComplate: false
    },
    mutations: {
        // 上传进度控制
        uploadStep(state, progress) {
            state.total = progress.total;
            state.currentStep = progress.currentStep;
            // console.log(state.total, state.currentStep)
        },
        // 上传图品以后返回的文件名
        getUploadImgUrl(state, imgNames) {
            state.imgNames = imgNames;
            state.uploadComplate = true;
        }
    }
})

export default store;