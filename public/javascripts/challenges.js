var challengesApp = new Vue({
  el: "#challenges",
  data: {
    pollingCount: 30,
    isPolling: false,
    challengeResponse: null,
    challengeStatus: null,
    pollingInterval: null,
    formData: {
      identity: null,
      factor_sid: null,
      message: null,
      fields: [
        {
          label: null,
          value: null
        }
      ]
    }
  },
  destroy: function() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  },
  methods: {
    addDetail: function() {
      this.formData.fields.push({
        label: null,
        value: null
      });
    },
    removeDetail: function(idx) {
      this.formData.fields.splice(idx, 1);
    },
    handleSubmit: function(event) {
      event.preventDefault();

      const promise = axios.post("/challenge", this.formData);
      promise
        .then(res => {
          console.log(res);
          this.challengeStatus = res.data.status;
          this.challengeResponse = JSON.stringify(res.data, null, 4);
          this.isPolling = true;

          // Start polling
          this.pollingInterval = setInterval(() => {
            this.checkStatus(res.data);
          }, 2000);
        })
        .catch(err => {
          console.error(err);
        });
    },
    checkStatus: function(challenge) {
      this.pollingCount -= 1;
      if (!this.pollingCount) {
        this.stopPolling();
      }

      const promise = axios.post(`/challenge/${challenge.sid}`, challenge);
      promise
        .then(res => {
          if (res.data.status !== "pending") {
            this.stopPolling();
          }
          this.challengeResponse = JSON.stringify(res.data, null, 4);
          this.challengeStatus = res.data.status;
        })
        .catch(err => {
          console.error(err);
        });
    },
    stopPolling: function() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }
      this.pollingCount = 30;
      this.isPolling = false;
    }
  }
});
