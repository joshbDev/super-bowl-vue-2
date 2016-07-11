<template>
  <div>
  <div class="header">Search the Super Bowls!</div>
  <div class="all-games"> Sort by...</div>
  <sb-teams></sb-teams>
  <sb-years></sb-years>
  <div v-on:click="allGames()" class="clickable all-games header"><small>Or See All Super Bowls</small></div>
  <div v-if="yearInfo.length" class="game-display">
    <div v-for="year in yearInfo">
    <sb-display :sb-info="year"></sb-display>
    </div>
  </div>
  </div>
</template>

<script>
import sbTeams from './teams-display.vue';
import sbYears from './years-display.vue';
import sbDisplay from './sb-display.vue';
import {sbData} from './sb-data';
import emitter from './emitter';
export default {
  components: {
    sbTeams,
    sbYears,
    sbDisplay,
  },
  data: function() {
    return {
      yearInfo: [],
    };
  },
  mounted() {
    emitter.$on('year-chosen', this.chosenYear.bind(this));
    emitter.$on('team-chosen', this.chosenTeam.bind(this));
  },
  methods: {
    chosenTeam(team) {
      this.yearInfo = [];

      if (!team || this.previouslyChosenTeam === team) {
        delete this.previouslyChosenTeam;
        return;
      }
      for (const year in sbData) {
        const selectedYear = sbData[year];
        if (selectedYear.teams[0] !== team && selectedYear.teams[1] !== team) { continue;}
        const gameData = buildGameData(sbData[year], year);
        this.yearInfo.push(gameData, year);
      }
      this.previouslyChosenTeam = team;
      this.yearInfo = [...this.yearInfo];
      emitter.$emit('team-updated', team);
    },
    allGames() {
      const yearInfo = [];
      for (const year in sbData) {
        const gameData = buildGameData(sbData[year], year);
        yearInfo.push(gameData);
      }
      this.yearInfo = yearInfo;
    },
    chosenYear(year) {
      if (!year) {
        this.yearInfo = [];
        this.isTheChosenYear = '';
        return;
      }
      const sbChosen = sbData[year];
      this.isTheChosenYear = year;
      const gameData = buildGameData(sbChosen, year);
      this.yearInfo = [gameData];
      emitter.$emit('year-updated', year);
    },
  },
}
function buildGameData(object, year) {
  object.superBowlLogo = `img/Super_Bowl_${year}`;
  object.winningTeam = {
    teamLogo: `img/${object.winner.replace(' ', '_')}.jpg`,
    score: object.score.split('-')[0],
    name: object.winner,
  };
  const loser = object.teams.filter((team) => {
    return object.winner !== team;
  });
  object.losingTeam = {
    teamLogo: `img/${loser[0].replace(' ', '_')}.jpg`,
    score: object.score.split('-')[1],
    name: loser[0],
  };
  object.teamLogos = [];
  object.teamLogos[0] = `img/${object.teams[0].replace(' ', '_')}.jpg`;
  object.teamLogos[1] = `img/${object.teams[1].replace(' ', '_')}.jpg`;
  return object;
}

</script>