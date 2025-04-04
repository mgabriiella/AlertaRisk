package br.alertarisk.mappers;

import br.alertarisk.controllers.request.clima.SaveAlertaRequest;
import br.alertarisk.controllers.request.clima.UpdateAlertaRequest;
import br.alertarisk.controllers.response.clima.DetailAlertaResponse;
import br.alertarisk.controllers.response.clima.ListAlertaResponse;
import br.alertarisk.controllers.response.clima.UpdateAlertaResponse;
import br.alertarisk.models.Alerta;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface AlertaMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "alertaAtivos",ignore = true)
    @Mapping(target = "alertaEnderecoStatus",ignore = true)
    @Mapping(target = "alertaPostagemStatus",ignore = true)
    @Mapping(target = "user",ignore = true)
    Alerta toModel(final SaveAlertaRequest request );

    ListAlertaResponse toSaveResponse(final Alerta alerta);

    Alerta toModel(final Long id, final UpdateAlertaRequest request);

    UpdateAlertaResponse toUpdateResponse(final Alerta alerta);

    DetailAlertaResponse toDetailResponse(final Alerta alerta);

    List<ListAlertaResponse> toListResponse(final List<Alerta> alerta);
}
