<template>
  <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title has-text-danger">Warning</p>
                    </header>
    
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">I understand</button>
                        <button class="button is-primary">Cancel</button>
                    </footer>
                </div>
            </form>
</template>

<script>
export default {
  name:'warningModal'
}
</script>

<style>

</style>

