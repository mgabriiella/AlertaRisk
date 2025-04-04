package br.alertarisk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class WeatherResponse {
    private Coord coord;
    private Rain rain;
    private Long dt;  // Timestamp provided in seconds since the epoch

    @Getter
    @Setter
    @Data
    public static class Coord {
        private double lon;
        private double lat;
    }
    @Getter
    @Setter
    @Data
    public static class Rain {
        @JsonProperty("1h")
        private Double oneH;  // Rain volume for the last hour

    }
}