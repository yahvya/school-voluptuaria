import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common"
import { EditPasswordData } from "../data-contracts/edit-password/edit-password.data"
import { EditPasswordResponse } from "../data-contracts/edit-password/edit-password-response"
import { EditPasswordService } from "../services/edit-password.service"
import { VoluptuariaAuthGuard } from "../../../commons/guards/voluptuaria-auth.guard"

@Controller("edit_password")
export class EditPasswordController {
    constructor(protected readonly editPasswordService: EditPasswordService) {
    }

    /**
     * @brief valide the user edit password
     * @param editPasswordData user password edit datas
     * @returns {EditPasswordResponse} validation results
     */

    @Post()
    @HttpCode(200)
    @UseGuards(VoluptuariaAuthGuard)
    public edit_password(
        @Body() editPasswordData: EditPasswordData,
    ): Promise<EditPasswordResponse> {
        return this.editPasswordService.editPassword({
            editPasswordData: editPasswordData,
        })
    }
}
