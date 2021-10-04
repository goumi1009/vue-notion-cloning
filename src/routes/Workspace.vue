<template>
  <section :key="$route.params.id">
    <div class="inner">
      <div
        ref="title"
        class="title"
        title="제목없음"
        contenteditable
        @input="onInput">
        {{ title }}
      </div>
      <div
        ref="content"
        class="content"
        title="내용을 입력 하세요!"
        contenteditable
        @input="onInput"
        v-html="content">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.currnetWorkspace.title;
    },
    content() {
      return this.$store.state.workspace.currnetWorkspace.content;
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('workspace/readWorkspace', {
        id: this.$route.params.id
      });
      this.$store.dispatch('workspace/findWorkspacePath');
    }
  },
  created() {
    this.$store.dispatch('workspace/readWorkspace', {
      id: this.$route.params.id
    });
  },
  methods: {
    onInput() {
      if(!this.$refs.content.textContent.trim()){
        this.$refs.content.innerHTML = '';
      }
      this.$store.dispatch('workspace/updateWorkspace', {
        id: this.$route.params.id,
        title: this.$refs.title.textContent,
        content: this.$refs.content.innerHTML
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 100px 0 200px;
  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    [contenteditable] {
      outline: none;
      cursor: text;
      &.title {
        margin-bottom: 20px;
        font-size: 44px;
        font-weight: 700;
      }
      &.content {
        font-size: 16px;
        line-height: 1.6;
      }
      &:empty::before {
        content: attr(title);
        color: rgba($color-font, .3);
      }
    }
  }
}
</style>