<style>
.sb-info {
  margin-bottom: 25px;
}
.super-bowl-logo {
  position: relative;
  max-width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
.super-bowl-logo img {
  max-height: 150px;
}
.sb-date {
  font-size: 25px;
  font-weight: 600;
}
.team-logo-section {
  position: absolute;
  text-align: center;
  margin: 0 20px;
}
.football-field {
  max-width: 100%;
  position: relative;
  text-align: center;
  z-index: -0;
}
.football-field img {
  max-width: 80%;
}
.losing-team {
  right: 0;
}
.sb-location {
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.3rem;
}
.team-logo-section {
  z-index: 1;
}
</style>
<template>
  <span>
    <div v-if="sbInfo.date" class="sb-info">
        <div class="super-bowl-logo">
          <img :src="sbInfo.superBowlLogo" >
          <div class="sb-date">{{sbInfo.date}}</div>
        </div>
        <div class="team-logo-section">
          <team-logo :team="sbInfo.winningTeam"></team-logo>
        </div>
        <div class="team-logo-section losing-team">
          <team-logo :team="sbInfo.losingTeam"></team-logo>
        </div>
        <div class="football-field">
          <img src="img/football_field.png">
        </div>
        <div class="sb-location">Played in {{sbInfo.location}} and {{sbInfo.attendance}} people attended</div>
      </div>
    </span>
</template>

<script>
import teamLogo from './team-logo.vue';
export default {
  components: {teamLogo},
  props: ['sbInfo'],
}
</script>