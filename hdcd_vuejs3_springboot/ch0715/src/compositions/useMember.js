import { reactive, computed } from 'vue'
import client from '/@modules/client.js'

export const useMember = () => {

  const state = reactive({
    jobCodes: [],
  })

  const jobCodes = computed(() => state.jobCodes)

  const FETCH_JOBCODE_LIST = (jobCodes) => {
    state.jobCodes = jobCodes
  }

  const fetchJobCodeList = () => {
    return client.get('/codes/job')
      .then(res => {
        FETCH_JOBCODE_LIST(res.data)
      })
  }

  return {
    jobCodes,
    fetchJobCodeList,
  }
}
