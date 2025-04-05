package br.alertarisk.mappers;

import br.alertarisk.controllers.request.alerta.SaveAlertaRequest;
import br.alertarisk.controllers.request.alerta.UpdateAlertaRequest;
import br.alertarisk.controllers.response.alerta.DetailAlertaResponse;
import br.alertarisk.controllers.response.alerta.ListAlertaResponse;
import br.alertarisk.controllers.response.alerta.SaveAlertaResponse;
import br.alertarisk.controllers.response.alerta.UpdateAlertaResponse;
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
    @Mapping(target = "endereco.alertas", ignore = true)
    Alerta toModel(final SaveAlertaRequest request );

    @Mapping(target = "endereco.alertas", ignore = true)
    SaveAlertaResponse toSaveResponse(final Alerta alerta);

    Alerta toModel(final Long id, final UpdateAlertaRequest request);

    UpdateAlertaResponse toUpdateResponse(final Alerta alerta);

    @Mapping(target = "endereco.alertas", ignore = true)
    DetailAlertaResponse toDetailResponse(final Alerta alerta);

    @Mapping(target = "endereco.alertas", ignore = true)
    List<ListAlertaResponse> toListResponse(final List<Alerta> alerta);
}
