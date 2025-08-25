export const GAS_SAVING_FORMULAS = {
  MONTHLY: {
    NO_USE_ROOM_HEATING_VALVE: 864, // 안 쓰는 방의 난방밸브 잠그기 (원/평)
    BOILER_CLEANING: 434, // 보일러 청소하기 (원/평)
    BOILER_WATER_TEMP_ADJUSTMENT: 287, // 보일러 온수 조절하기 (원/평)
  },
  ANNUAL: {
    NO_USE_ROOM_HEATING_VALVE: 864 * 12, // 10368 (원/평)
    BOILER_CLEANING: 434 * 12, // 5208 (원/평)
    BOILER_WATER_TEMP_ADJUSTMENT: 287 * 12, // 3444 (원/평)
  },
};