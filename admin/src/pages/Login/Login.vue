<template>
  <div class="login-page">
    <b-container>
      <h5 class="logo">
        <i class="fa fa-circle text-gray"/>
        Streamz
        <i class="fa fa-circle text-warning"/>
      </h5>
      <Widget class="mx-auto" title="<h3 class='mt-0'>Welcome</h3>" customHeader>
        <p class="text-muted mb-0 mt fs-sm mt-3"></p>
        <br>

        <p class="text-muted fs-sm"></p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">{{errorMessage}}</b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="username"
              required
              type="text"
              name="username"
              placeholder="Username"
            >
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="password"
              required
              type="password"
              name="password"
              placeholder="Password"
            >
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <b-button type="submit" size="sm" variant="inverse">Login</b-button>
            </div>
          </div>
          <div class="row no-gutters mt-3">
            <div class="col"></div>
            <div class="col">
              <a class="mt-sm" href>Forgot password?</a>
            </div>
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="footer">2019 &copy; Streamz admin.</footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      errorMessage: null
    };
  },
  methods: {
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      if (username.length !== 0 && password.length !== 0) {
        this.$http
          .post("admin/authenticate/login", { username, password })
          .then(({ data }) => {
            
          
            if (data.token && data.admin) {
              this.$store.commit("layout/setUser",data.userId);
              window.localStorage.setItem("userId", data.userId);
              window.localStorage.setItem("mail", data.email);
              window.localStorage.setItem("authenticated", true);
              window.localStorage.setItem("token_admin", data.token);
              this.$store.commit("layout/setAuth", true);
              this.$store.commit("layout/setEmail", data.email);
              this.$router.push("/app/dashboard");
            }
            else{

              this.errorMessage = 'Incorrect credential';
              setTimeout(()=>{
                this.errorMessage = null;
              },1500)
            }
          }).catch(()=>{
            this.errorMessage = 'Incorrect credential';
             setTimeout(()=>{
                this.errorMessage = null;
              },1500)
          });
      }
    }
  },
  created() {
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped />
