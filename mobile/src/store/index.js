import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        imgNames: [],
        total: 0,
        currentStep: 0,
        uploadComplate: false
    },
    mutations: {
        uploadStep(state, progress) {
            state.total = progress.total;
            state.currentStep = progress.currentStep;
            console.log(state.total, state.currentStep)
        },
        getUploadImgUrl(state, imgNames) {
            state.imgNames = imgNames;
            state.uploadComplate = true;
        }
    }
})

export default store;