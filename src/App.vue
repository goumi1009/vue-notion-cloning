<template>
  <div class="app__inner">
    <LNB />
    <div class="app__page">
      <div class="page__header">
        <Header />
      </div>
      <div class="page__container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import LNB from '~/components/LNB';
import Header from  '~/components/Header';
export default {
  components: {
    LNB,
    Header
  }
};
</script>

<style lang="scss" scoped>

.app__inner {
  display: flex;
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: $color-font;
  line-height: 1.4;
  
  .app__page {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;

    .page__header {
      height: 80px;
    }

    .page__container {
      flex-grow: 1;
    }
  }
}
</style>