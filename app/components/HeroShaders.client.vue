<script setup lang="ts">
import { Shader, Pixelate, Plasma, SineWave } from 'shaders/vue'
</script>

<template>
  <Shader>
    <Pixelate
      :gap="{
        type: 'map',
        curve: 0.9,
        source: 'idmmbhthud5inxgebqc',
        channel: 'alphaInverted',
        inputMax: 2,
        inputMin: 0,
        outputMax: 1.2,
        outputMin: 0.1,
      }"
      :roundness="0.1"
      :scale="999"
      :transform="{ rotation: 180 }"
    >
      <Plasma
        :balance="59"
        color-a="#f59e0b"
        color-b="#0f0d0a"
        :contrast="1.6"
        :density="3.3"
        :intensity="1.8"
        :visible="true"
      />
    </Pixelate>
    <SineWave
      id="idmmbhthud5inxgebqc"
      :amplitude="0.1"
      :position="{
        x: 0.5,
        y: 1,
      }"
      :softness="0.8"
      :thickness="0.7"
      :visible="false"
    />
  </Shader>
</template>
